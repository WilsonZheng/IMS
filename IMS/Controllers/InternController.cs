using IMS.Models;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;
using IMS.ViewModels;
using IMS.Common;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using LinqKit;

namespace IMS.Controllers
{
    [Authorize]
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
        [Authorize(Roles ="admin,staff")]
        public ActionResult getInterns(InternSearchConditionViewModel model)
        {
            try
            {
                //set to the default if not provided.
                if (!model.DaysSinceExpiry.HasValue) model.DaysToExpiry = 365;
                if (!model.DaysSinceExpiry.HasValue) model.DaysSinceExpiry = 0;
                var toDate = DateTime.UtcNow.Date.AddDays((int)model.DaysToExpiry);
                var fromDate = DateTime.UtcNow.Date.AddDays((int)model.DaysSinceExpiry * -1);

                using (var db = new ApplicationDbContext())
                {
                    
                    var predicate = PredicateBuilder.True<Internship>().And(x => x.Intern.OrgId == IMSUserUtil.OrgId && (x.ExpiryAt >= fromDate && x.ExpiryAt <= toDate));
                    //for staff, only return the list of interns who have been under their supervision.
                    if (IMSUserUtil.IsInRole(IMSContants.ROLE_STAFF))
                    {
                        predicate = predicate.And(x=>x.Supervisors.Any(y=>y.Id==IMSUserUtil.Id));
                    }
                    var result=db.Internships.Include(i => i.Intern)
                        .Include (i =>i.Supervisors)
                        .Include (i =>i.Tasks).AsExpandable().Where(predicate).ToList()
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
                                   TaskToDos=x.Tasks.Where(t=>t.IsActive&&!t.IsClosed).Select(t=>new TaskToDoViewModel {
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
        public ActionResult getDetails(int internId)
        {
            try
            {
                using (var db = new ApplicationDbContext()) {
                    var result = db.Internships.Where(x => x.Id == internId && x.Intern.OrgId==IMSUserUtil.OrgId)
                        .Include(x => x.Intern).Include(x => x.Tasks)
                        .Include(x => x.Supervisors)
                        .Select(x => new InternViewModel
                         {
                             Id = x.Id,
                             FirstName = x.Intern.FirstName,
                             LastName = x.Intern.LastName,
                             CommenceAt = x.CommenceAt,
                             ExpiryAt = x.ExpiryAt,
                             Supervisors = x.Supervisors.Select(s => new SupervisorViewModel
                             {
                                 Id = s.Id,
                                 FirstName = s.FirstName,
                                 LastName = s.LastName
                             }).ToList(),
                             TaskToDos = x.Tasks.Where(t=>t.IsActive).Select(t => new TaskToDoViewModel
                             {
                                 Id = t.Id,
                                 Description = t.Description,
                                 Title = t.Title
                             }).ToList()
                         }).Single();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
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
        [Authorize(Roles ="admin,staff")]
        public ActionResult getSupervisingComments(int internId)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.SupervisingComments
                        .Include(x=>x.Supervisor)
                        .Include(x => x.Internship)
                        .Include(x => x.Internship.Intern)
                        .Where(x =>x.IsActive && x.InternshipId == internId
                        && x.Internship.Intern.OrgId == IMSUserUtil.OrgId).ToList()
                        .Select(x => new SupervisingCommentViewModel
                        {
                            Id = x.Id,
                            CreatedAt = x.CreatedAt,
                            Comment = x.Comment,
                            SupervisorId=x.SupervisorId,
                            SupervisorName=string.Format("{0} {1}",x.Supervisor.FirstName,x.Supervisor.LastName)
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

                    var supervisor = IMSUserUtil.DetachedUser;
                    
                    model.Id = comment.Id;
                    model.CreatedAt = comment.CreatedAt;
                    model.SupervisorId = IMSUserUtil.Id;
                    model.SupervisorName = string.Format("{0} {1}", supervisor.FirstName, supervisor.LastName);
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
                    var supervisor = IMSUserUtil.DetachedUser;
                    model.Id = task.Id;
                    model.Participants = new List<InternViewModel>();
                    model.SupervisorId = supervisor.Id;
                    model.SupervisorName = string.Format("{0} {1}",supervisor.FirstName,supervisor.LastName);
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
        [Authorize(Roles ="admin,staff")]
        public ActionResult manageParticipant(TaskParticipantRequestViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    var task = db.TaskToDos.Where(x => x.Id == model.TaskId && x.Owner.Id == IMSUserUtil.Id && x.IsActive).SingleOrDefault();
                    if (task == null) throw new Exception("Task Not Found");
                    var predicate = PredicateBuilder.True<Internship>().And(x => x.Id==model.ParticipantId && x.Intern.OrgId == IMSUserUtil.OrgId);
                    //staff have the control over only the interns who are under their supervising. This doesn't apply to admin user.
                    if (IMSUserUtil.IsInRole(IMSContants.ROLE_STAFF))
                    {
                        predicate = predicate.And(x => x.Supervisors.Any(y => y.Id == IMSUserUtil.Id));
                    }
                    var participant = db.Internships.Include(x=>x.Tasks).AsExpandable().Where(predicate).SingleOrDefault();
                    if (participant == null) throw new Exception("Participant Not Found");
                    if (model.IsJoining)
                    {
                        db.InternTaskInvolvements.Add(new InternTaskInvolvement {
                             InternId=model.ParticipantId,
                             TaskId=model.TaskId,
                             JoinAt= DateTime.UtcNow,
                             IsActive=true
                        });
                        participant.Tasks.Add(task);
                    }
                    else {
                        participant.Tasks.Remove(task);
                        var involvement = db.InternTaskInvolvements.Where(x => x.TaskId == model.TaskId && x.InternId == model.ParticipantId && x.IsActive).SingleOrDefault();
                        if (involvement == null) throw new Exception("Matching Involvement History Record Not Found!");
                        involvement.IsActive = false;
                        involvement.LeftAt = DateTime.UtcNow;
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
        [Authorize(Roles ="admin,staff")]
        public ActionResult getTasks()
        {
            try
            {
                //return the list of tasks which belong to this admin or staff.
                using (var db = new ApplicationDbContext())
                {
                    var result = db.TaskToDos
                        .Include(x=>x.Owner)
                        .Include(x => x.Participants)
                        .Include(x => x.Participants.Select(y => y.Intern))
                        .Where(x => x.IsActive && !x.IsClosed && x.Owner.Id==IMSUserUtil.Id)
                        .ToList()
                        .Select(x => new TaskToDoViewModel
                        {
                            Id = x.Id,
                            Title = x.Title,
                            SupervisorId=x.OwnerId,
                            SupervisorName= string.Format("{0} {1}",x.Owner.FirstName,x.Owner.LastName),
                            Description = x.Description,
                            Participants = x.Participants.Select(y => new InternViewModel
                            {
                                Id = y.Id,
                                FirstName = y.Intern.FirstName,
                                LastName = y.Intern.LastName,
                                UserName = y.Intern.UserName
                            }).ToList()
                        }).OrderByDescending(x => x.Id).ToList();
                        
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
                   
                    var result = db.TaskToDos.Where(x => x.Participants.Any(p => p.Id == id) && x.IsActive && !x.IsClosed)
                        .Include(x => x.Owner)
                        .Include(x => x.Participants)
                        .Include(x=>x.Participants.Select(p=>p.Intern))
                        .ToList().Select(x => new TaskToDoViewModel {
                            Id=x.Id,
                            Title=x.Title,
                            Description=x.Description,
                            SupervisorId=x.OwnerId,
                            SupervisorName= string.Format("{0} {1}",x.Owner.FirstName,x.Owner.LastName),
                            IsClosed=x.IsClosed,
                            Participants=x.Participants.Select(p=>new InternViewModel { Id=p.Id, FirstName=p.Intern.FirstName,LastName=p.Intern.LastName }).ToList()
                        }).ToList();
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        [Authorize(Roles ="admin,staff")]
        public ActionResult closeTask(TaskToDoViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var task=db.TaskToDos.Where(x => x.Id == model.Id && x.OwnerId == IMSUserUtil.Id).SingleOrDefault();
                    if (task == null) throw new Exception("Not found");
                    task.IsClosed = true;
                    task.ClosedAt = DateTime.UtcNow;
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
        [Authorize(Roles ="admin")]
        public ActionResult adjustExpiry(AdjustExpiryViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Internships.Where(x => x.Id == model.InternId && x.Intern.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (result == null) throw new Exception("Not Found");
                    DateTime adjustedDt=result.ExpiryAt.AddDays(model.Adjustment*(model.IsExtension?1:-1));
                    if (adjustedDt <= result.CommenceAt) {
                        throw new Exception("Expiry date needs to come after the commence date.");
                    }
                    result.ExpiryAt = adjustedDt;
                    db.SaveChanges();
                    return Json(new ImsResult { Data = adjustedDt });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }





        [HttpPost]
        public ActionResult getReports(TaskReportListRequestViewModel model)
        {
            try
            {
                //intern can read their own reports only.
                if (IMSUserUtil.IsInRole(IMSContants.ROLE_INTERN) && model.InternId != IMSUserUtil.Id) {
                    throw new Exception("Unauthorized access!");
                }
                using (var db = new ApplicationDbContext())
                {
                    var result=db.TaskReports
                        .Where(x => x.TaskId == model.TaskId && x.InternshipId == model.InternId && x.IsActive )
                        .ToList()
                        .Select(x => new TaskReportViewModel {
                            Id=x.Id,
                            TaskId=x.TaskId,
                            Title=x.Title,
                            Content=x.Content,
                            CreatedAt=x.CreatedAt
                        }).OrderByDescending(x=>x.Id);
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult deleteReport(TaskReportViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var task = db.TaskToDos.Where(x => x.Id == model.TaskId && x.IsActive && !x.IsClosed).SingleOrDefault();
                    if (task == null) throw new Exception("Task is not active!");
                    var report = db.TaskReports.Where(x => x.Id == model.Id && x.InternshipId == IMSUserUtil.Id).SingleOrDefault();
                    if (report == null) throw new Exception("Not Found");
                    report.IsActive = false;
                    db.SaveChanges();
                    return Json(new ImsResult { Data = model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        public ActionResult updateReport(TaskReportViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var task = db.TaskToDos.Where(x => x.Id == model.TaskId && x.IsActive && !x.IsClosed).SingleOrDefault();
                    if (task == null) throw new Exception("Task is not active!");
                    var report = db.TaskReports.Where(x => x.Id == model.Id && x.InternshipId == IMSUserUtil.Id).SingleOrDefault();
                    if (report == null) throw new Exception("Not Found");
                    report.Title = model.Title;
                    report.Content = model.Content;
                    db.SaveChanges();
                    return Json(new ImsResult { Data = model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        public ActionResult createReport(TaskReportViewModel model)
        {
            try
            {

                using (var db = new ApplicationDbContext())
                {
                    var task=db.TaskToDos.Where(x => x.Id == model.TaskId && x.IsActive && !x.IsClosed).SingleOrDefault();
                    if (task == null) throw new Exception("Task is not active!");
                    var report = new TaskReport {
                            Content=model.Content,
                            Title=model.Title,
                            CreatedAt=DateTime.UtcNow,
                            InternshipId=IMSUserUtil.Id,
                            TaskId=model.TaskId,
                            IsActive =true
                    };
                    db.TaskReports.Add(report);
                    db.SaveChanges();
                    model.Id = report.Id;
                    model.CreatedAt = report.CreatedAt;
                    return Json(new ImsResult { Data = model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        public ActionResult getTaskHistoryForIntern(int internId)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var model = db.InternTaskInvolvements
                        .Where(x => x.InternId == internId && x.Task.IsActive)
                        .Include(x => x.Task)
                        .Include(x => x.Task.Owner)
                        .ToList()
                        .Select(x => new TaskInvolvemenViewModel {
                                 TaskId=x.TaskId,
                                 TaskName=x.Task.Title,
                                  SuperVisorId=x.Task.OwnerId,
                                  SupervisorName= string.Format("{0} {1}",x.Task.Owner.FirstName,x.Task.Owner.LastName),
                                  JoinAt=x.JoinAt,
                                  LeftAt=x.LeftAt,
                                  IsClosed=x.Task.IsClosed,
                                  TaskClosedAt=x.Task.ClosedAt
                        }).OrderBy(x=>x.TaskName).ThenByDescending(x=>x.JoinAt);
                    return Json(new ImsResult { Data = model });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }







    }
}