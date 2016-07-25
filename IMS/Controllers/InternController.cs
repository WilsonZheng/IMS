using IMS.Models;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;
using IMS.ViewModels;
using IMS.Common;
using System.Web;
using Microsoft.AspNet.Identity.Owin;

namespace IMS.Controllers
{
    public class InternController : Controller
    {





        private IMSUserUtil IMSUserUtil
        {
            get
            {
                if (_imsUserUtil == null)
                {
                    this._imsUserUtil = new IMSUserUtil(User, HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>());
                }
                return _imsUserUtil;
            }
        }
        private IMSUserUtil _imsUserUtil;

        
        [HttpPost]
        public ActionResult getInterns()
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result=db.Internships.Include(i => i.Intern)
                        .Include (i =>i.Supervisors)
                        .Include (i =>i.Tasks).
                        Where(x => x.Intern.OrgId == IMSUserUtil.OrgId && x.ExpiryAt >= DateTime.UtcNow).ToList()
                        .Select(x => new InternViewModel {
                             Id=x.Id,
                              FirstName=x.Intern.FirstName,
                              LastName=x.Intern.LastName,
                               UserName=x.Intern.UserName,
                                CommenceAt=x.CommenceAt,
                                 ExpiryAt=x.ExpiryAt,
                                  Supervisors=x.Supervisors.Select(s=>new SupervisorViewModel {
                                       Id=s.Id,
                                       FirstName=s.FirstName,
                                       LastName=s.LastName
                                  }).ToList(),
                                   TaskToDos=x.Tasks.Select(t=>new TaskToDoViewModel {
                                        Id=t.Id,
                                        Title=t.Title
                                   }).ToList()
                        }).OrderBy(x=>x.FirstName).ToList();
                    return Json(new ImsResult { Data=result });
                }
            }catch(Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error=e.Message });
            }
        }

        [HttpPost]
        public ActionResult getSupervisors()
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var staffRoleId = db.Roles.Where(z => z.Name.Equals(IMSContants.ROLE_STAFF)).Select(r => r.Id).Single();
                    var query=db.Users
                        .Include(x=>x.Internships)
                        .Include(x=>x.Internships.Select(y=>y.Intern)).
                         Where(x => x.OrgId == IMSUserUtil.OrgId && x.Roles.Any(y => y.RoleId == staffRoleId));
                    var result = query.ToList()
                        .Select(x => new SupervisorViewModel
                        {
                            Id = x.Id,
                            FirstName = x.FirstName,
                            LastName = x.LastName,
                            Interns = x.Internships.Where(y=>y.ExpiryAt>=DateTime.UtcNow).Select(y=>y.Intern)  //only include interns before expiry.
                                        .Select(y=>new InternViewModel {
                                                   Id=y.Id,
                                                   FirstName=y.FirstName,
                                                   LastName=y.LastName,
                                                   UserName=y.UserName
                            }).ToList()                        
                        }).OrderBy(x=>x.FirstName).ToList();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult getSupervisorsForIntern(int internId)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Internships.Where(x => x.Id == internId).SelectMany(x => x.Supervisors)
                        .Select(x => new SupervisorViewModel {
                            Id = x.Id,
                            FirstName = x.FirstName,
                            LastName=x.LastName
                        }).OrderBy(x=>x.FirstName).ToList();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult handleSupervising(SupervisingRequestViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {

                    var supervisor = db.Users.Where(x => x.Id == model.SupervisorId && x.OrgId==IMSUserUtil.OrgId).SingleOrDefault();
                    if (supervisor == null) throw new Exception("Corresponding supervisor not found.");

                    var internship = db.Internships.Include(x=>x.Supervisors).Where(x => x.Id == model.InternId && x.Intern.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (internship == null) throw new Exception("Corresponding intern not found.");
                    if (model.ToConnect)
                    {
                        internship.Supervisors.Add(supervisor);
                    }
                    else {
                        internship.Supervisors.Remove(supervisor);
                    }
                
                    db.SaveChanges();
                    var interns = db.Users.Where(x => x.Id == model.SupervisorId).SelectMany(x => x.Internships.Select(y => y.Intern)).ToList()
                       .Select(x => new InternViewModel
                       {
                           Id = x.Id,
                           FirstName = x.FirstName,
                           LastName = x.LastName,
                           UserName = x.UserName
                       }).OrderBy(x => x.FirstName).ToList();

                    var supervisors = db.Internships.Where(x => x.Id == model.InternId).SelectMany(x => x.Supervisors)
                        .Select(x => new SupervisorViewModel {
                            Id=x.Id,
                            FirstName=x.FirstName,
                            LastName=x.LastName
                        }).ToList();

                    var result = new SupervisingResponseViewModel
                    {
                        InternId = model.InternId,
                        SupervisorId = model.SupervisorId,
                        Interns = interns,
                        Supervisors = supervisors
                    };
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult getSupervisingComments(int internId)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.SupervisingComments
                        .Include(x => x.Internship)
                        .Include(x => x.Internship.Intern)
                        .Where(x =>x.IsActive && x.InternshipId == internId
                        && x.Internship.Intern.OrgId == IMSUserUtil.OrgId && x.SupervisorId == IMSUserUtil.Id)
                        .Select(x => new SupervisingCommentViewModel
                        {
                            Id = x.Id,
                            CreatedAt = x.CreatedAt,
                            Comment = x.Comment
                        }).OrderByDescending(x => x.Id)
                        .ToList();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult createSupervisingComment(SupervisingCommentViewModel model)
        {
            try
            {

                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    var comment = new SupervisingComment
                    {
                        Comment = model.Comment,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow,
                        InternshipId = model.InternshipId,
                        SupervisorId = IMSUserUtil.Id
                    };
                    db.SupervisingComments.Add(comment);
                    db.SaveChanges();

                    model.Id = comment.Id;
                    model.CreatedAt = comment.CreatedAt;
                    return Json(new ImsResult { Data = model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult deleteSupervisingComment(SupervisingCommentViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {

                    var comment = db.SupervisingComments.Where(x => x.Id == model.Id && x.SupervisorId == IMSUserUtil.Id).SingleOrDefault();
                    if (comment == null) throw new Exception("Not Found!");
                    comment.IsActive = false;
                    db.SaveChanges();
                    return Json(new ImsResult {});
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult updateSupervisingComment(SupervisingCommentViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {

                    var comment = db.SupervisingComments.Where(x => x.Id == model.Id && x.SupervisorId == IMSUserUtil.Id).SingleOrDefault();
                    if (comment == null) throw new Exception("Not Found!");
                    comment.UpdatedAt = DateTime.UtcNow;
                    comment.Comment = model.Comment;
                    db.SaveChanges();
                    return Json(new ImsResult {});
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        /// <summary>
        /// Task Management.
        /// </summary>
     
        [HttpPost]
        public ActionResult createTask(TaskToDoViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    var task = new TaskToDo {
                                            Title = model.Title,
                                            Description=model.Description,
                                            OwnerId=IMSUserUtil.Id,
                                            IsActive=true,
                                            IsClosed=false,
                                            CreatedAt=DateTime.UtcNow,
                                            UpdatedAt=DateTime.UtcNow
                    };
                    db.TaskToDos.Add(task);
                    db.SaveChanges();
                    model.Id = task.Id;
                    return Json(new ImsResult { Data=model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult deleteTask(TaskToDoViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    var task = db.TaskToDos.Where(x => x.Id == model.Id && x.OwnerId == IMSUserUtil.Id && x.IsActive).SingleOrDefault();
                    if (task == null) throw new Exception("Not Found");
                    task.IsActive = false;
                    db.SaveChanges();
                    return Json(new ImsResult { });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }
        
        [HttpPost]
        public ActionResult updateTask(TaskToDoViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) {
                    var resu=BindingModelChecker.CheckModelState(ModelState);
                    throw new Exception("Invalid Input"); }
                using (var db = new ApplicationDbContext())
                {
                    var task = db.TaskToDos.Where(x => x.Id == model.Id && x.OwnerId == IMSUserUtil.Id && x.IsActive).SingleOrDefault();
                    if (task == null) throw new Exception("Not Found");
                    task.Description = model.Description;
                    task.Title = model.Title;
                    task.UpdatedAt = DateTime.UtcNow;
                    db.SaveChanges();
                    return Json(new ImsResult { });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult manageParticipant(TaskParticipantRequestViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    //admin user has the control over the tasks owned by other staff.
                    var task = db.TaskToDos.Where(x => x.Id == model.TaskId && x.Owner.OrgId == IMSUserUtil.OrgId && x.IsActive).SingleOrDefault();
                    if (task == null) throw new Exception("Task Not Found");
                    var participant = db.Internships.Include(x=>x.Tasks).Where(x => x.Id == model.ParticipantId && x.Intern.OrgId==IMSUserUtil.OrgId).SingleOrDefault();
                    if (participant == null) throw new Exception("Participant Not Found");
                    if (model.IsJoining)
                    {
                        participant.Tasks.Add(task);
                    }
                    else {
                        participant.Tasks.Remove(task);
                    }
                    db.SaveChanges();
                    var result = db.TaskToDos.Where(x => x.Id == model.TaskId)
                        .SelectMany(x => x.Participants.Select(y => y.Intern))
                        .Select(y => new InternViewModel {
                            Id = y.Id,
                            FirstName = y.FirstName,
                            LastName = y.LastName,
                            UserName = y.UserName
                        }).ToList();
                    return Json(new ImsResult {Data=result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        public ActionResult getTasks()
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.TaskToDos
                        .Include(x => x.Participants)
                        .Include(x => x.Participants.Select(y => y.Intern))
                        .Where(x => x.IsActive && x.Owner.OrgId == IMSUserUtil.OrgId)
                        .ToList()
                        .Select(x => new TaskToDoViewModel {
                            Id = x.Id,
                            Title = x.Title,
                            Description = x.Description,
                            Participants = x.Participants.Select(y => new InternViewModel {
                                Id = y.Id,
                                FirstName = y.Intern.FirstName,
                                LastName = y.Intern.LastName,
                                UserName = y.Intern.UserName
                            }).ToList()
                        });
                    return Json(new ImsResult { Data=result});
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult getTasksForIntern(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result =db.Internships.Where(x => x.Id == id && x.Intern.OrgId == IMSUserUtil.OrgId)
                        .SelectMany(x => x.Tasks)
                        .Select(x => new TaskToDoViewModel {
                                Id=x.Id,
                                Title=x.Title
                        }).ToList();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

    }
}