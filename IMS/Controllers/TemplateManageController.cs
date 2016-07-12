using IMS.Models;
using IMS.ViewModels;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Data.Entity;
using System;
using System.Web;
using IMS.Common;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class TemplateManageController : Controller
    {

        private IMSUserUtil IMSUserUtil
        {
            get
            {
                if (_imsUserUtil == null)
                {
                    this._imsUserUtil = new IMSUserUtil(this.User, HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>());
                }
                return _imsUserUtil;
            }
        }
        private IMSUserUtil _imsUserUtil;


        // GET: TemplateManage
        public ActionResult Index()
        {
            return View();
        }

        //Rest Call
        [HttpPost]
        public ActionResult CreateTemplate(EmailTemplateViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input");
                using (var db = new ApplicationDbContext())
                {
                    var templateType = db.TemplateTypes.Where(x => x.Code == (int)TemplateTypeCode.Email).Single();
                    var template = new Template {
                        Name = model.Name,
                        Content = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(model.Content)),
                        IsActive = true,
                        OrgId = IMSUserUtil.OrgId,
                        CreatedAt = DateTime.UtcNow,
                        CreatedById = IMSUserUtil.Id,
                        TemplateType = templateType
                    };
                    db.Templates.Add(template);
                    db.SaveChanges();
                    model.Id = template.Id;
                    
                    model.Content = null;
                    var recruitStatus = db.Invitations.Where(x => x.TemplateId == model.Id).GroupBy(x => x.RecruitStatusType).Select(group => new { Key = group.Key.Code, Count = group.Count() }).ToList();
                    model.RecruitStatus =
                    new RecruitStatusViewModel
                    {
                        Approved = recruitStatus.Where(x => x.Key == (int)RecruitStatusCode.Approved).Select(x => x.Count).SingleOrDefault(),
                        Received = recruitStatus.Where(x => x.Key == (int)RecruitStatusCode.ContractReceived).Select(x => x.Count).SingleOrDefault(),
                        Saved = recruitStatus.Where(x => x.Key == (int)RecruitStatusCode.InvitationCreated).Select(x => x.Count).SingleOrDefault(),
                        Sent = recruitStatus.Where(x => x.Key == (int)RecruitStatusCode.Approved).Select(x => x.Count).SingleOrDefault(),
                        Total = recruitStatus.Sum(x => x.Count)
                    };

                    return Json(new ImsResult { Data=model});
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }


        [HttpPut]
        public ActionResult UpdateTemplate(EmailTemplateViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var template = db.Templates.Where(x => x.Id == model.Id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (template == null) throw new Exception("Not Found!");
                    template.Name = model.Name;
                    template.Content = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(model.Content));
                    db.SaveChanges();
                    return Json(new ImsResult());
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteTemplate(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var template = db.Templates.Where(x => x.Id == id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if(template==null)throw new Exception("Not Found!");
                    template.IsActive = false;
                    db.SaveChanges();
                    return Json(new ImsResult());
                }

            }
            catch(Exception e) {
                return Json(new ImsResult { Error=e.Message });
            }
        }

        [HttpPost]
        public ActionResult GetTemplate(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var template = db.Templates.Where(x => x.Id == id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (template == null) throw new Exception("Not Found!");
                    var model=new EmailTemplateViewModel
                    {
                        Id = template.Id,
                        Name = template.Name,
                        Content = JsonConvert.DeserializeObject<EmailTemplateContentViewModel>(Encoding.UTF8.GetString(template.Content))
                    };
                    db.SaveChanges();
                    return Json(new ImsResult() {Data=model},JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Templates()
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Templates.Include(x=>x.TemplateType)
                        .Where(x => x.OrgId == IMSUserUtil.OrgId && x.IsActive && x.TemplateType.Code == (int)TemplateTypeCode.Email)
                        .GroupJoin( db.Invitations,
                                    template=>template.Id,
                                    invitation=>invitation.TemplateId,
                        (template,invitation)=>
                        new {
                                template,
                                Total =invitation.Count(),
                                Saved= invitation.Where(x => x.RecruitStatusType.Code == (int)RecruitStatusCode.InvitationCreated).Count(),
                                Sent =invitation.Where(x=>x.RecruitStatusType.Code==(int)RecruitStatusCode.InvitationSent).Count(),
                                Received = invitation.Where(x => x.RecruitStatusType.Code == (int)RecruitStatusCode.ContractReceived).Count(),
                                Approved = invitation.Where(x => x.RecruitStatusType.Code == (int)RecruitStatusCode.Approved).Count()
                            })
                        .ToList().OrderByDescending(x=>x.template.Id)
                        .Select(x => new EmailTemplateViewModel
                        {
                            Id = x.template.Id,
                            Name = x.template.Name,
                            RecruitStatus=new RecruitStatusViewModel{
                                                                      Total=x.Total,
                                                                      Saved=x.Saved,
                                                                      Sent=x.Sent,
                                                                      Received=x.Received,
                                                                      Approved=x.Approved
                                                                     }

                        }).ToList();
                    return Json(new ImsResult { Data = result }, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception e)
            {
                return Json(new ImsResult { Error = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        //Rest Call End

        public ActionResult List()
        {
            using (var db = new ApplicationDbContext())
            {
                if (db.Templates.Where(x => x.Org.Id == IMSUserUtil.OrgId && x.TemplateType.Code==(int)TemplateTypeCode.Contract).Count() == 0)
                {
                    foreach(var tmpType in db.TemplateTypes.Where(x => x.IsActive && x.Code ==(int)TemplateTypeCode.Contract).ToList())
                    {
                        
                        db.Templates.Add(new Template
                        {
                            IsActive = false,
                            Content = Encoding.UTF8.GetBytes(""),
                            TemplateType = tmpType,
                            OrgId = IMSUserUtil.OrgId,
                            CreatedBy =IMSUserUtil.AttachedUser(db),
                            CreatedAt = DateTime.UtcNow
                        });
                    }
                    db.SaveChanges();
                }
                var result = db.Templates
                    .Where(x => x.OrgId == IMSUserUtil.OrgId && x.TemplateType.Code==(int)TemplateTypeCode.Contract)
                    .Select(x => new TemplateListViewModel { Id = x.Id, IsActive = x.IsActive  }).ToList();
                return PartialView("_TemplateList",result);
            }
        }


        public ActionResult SeedTemplates()
        {
            using (var db = new ApplicationDbContext())
            {
                var tmpType = db.TemplateTypes.Where(x => x.Code == (int)TemplateTypeCode.Email).Single();
                int i =0;
                while (i++ < 30)
                {
                    db.Templates.Add(new Template
                    {
                        Name = "This is test template",
                        IsActive = false,
                        Content = Encoding.UTF8.GetBytes(tmpType.Code != (int)TemplateTypeCode.Email ? "" : JsonConvert.SerializeObject(new EmailTemplateContentViewModel { DefaultSubject = "Notice", DefaultContent = "Hi" })),
                        TemplateType = tmpType,
                        OrgId = IMSUserUtil.OrgId,
                        CreatedBy = IMSUserUtil.AttachedUser(db),
                        CreatedAt = DateTime.UtcNow
                    });
                }
                db.SaveChanges();
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
        }


      


        public ActionResult Edit(int id)
        {
            using(var db=new ApplicationDbContext())
            {
                var model=db.Templates
                    .Include(x=>x.TemplateType)
                    .Where(x => x.Id == id && x.OrgId== IMSUserUtil.OrgId)
                    .ToList()
                    .Select(x=>new TemplateViewModel {
                        Id = x.Id,
                        Description=x.TemplateType.Description,
                        Content = x.Content!=null?Encoding.UTF8.GetString(x.Content):""
                    }).Single();
                return PartialView("_NewOrModify",model);
            }
        }

        public ActionResult EditEmailTemplate(int id)
        {
            using (var db = new ApplicationDbContext())
            {
                var model = db.Templates
                    .Include(x => x.TemplateType)
                    .Where(x => x.Id == id && x.OrgId == IMSUserUtil.OrgId)
                    .ToList()
                    .Select(x => new EmailTemplateViewModel
                    {
                        Id = x.Id,
                        Name=x.Name,
                        Content =  JsonConvert.DeserializeObject<EmailTemplateContentViewModel>(Encoding.UTF8.GetString(x.Content))
                    }).Single();
                return PartialView("_NewOrModifyEmail", model);
            }
        }
        

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Update(TemplateViewModel model)
        {
            try {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        var existing = db.Templates.Where(x => x.Id == model.Id && x.OrgId == IMSUserUtil.OrgId).Single();
                        existing.Content = Encoding.UTF8.GetBytes(model.Content);
                        db.SaveChanges();
                        return Json(new { });
                    }
                }
            } catch
            {
                ModelState.AddModelError("", "Request can not be processed!");
            }
            Response.StatusCode = 400;
            return PartialView("_NewOrModify",model);
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateEmailTemplate(EmailTemplateViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        var existing = db.Templates.Where(x => x.Id == model.Id && x.OrgId == IMSUserUtil.OrgId).Single();
                        existing.Name = model.Name;
                        existing.Content = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(model.Content));
                        db.SaveChanges();
                        return Json(new { });
                    }
                }
            }
            catch
            {
                ModelState.AddModelError("", "Request can not be processed!");
            }
            Response.StatusCode = 400;
            return PartialView("_NewOrModify", model);
        }



        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ToggleIsActive(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Templates.Where(x => x.Id == id && x.OrgId== IMSUserUtil.OrgId).Single();
                    result.IsActive = !result.IsActive;
                    db.SaveChanges();
                    return Json(new{result="OK"});
                }
            }
            catch {
                return Json(new {Error="Exception"});
            }
        }
        
        public ActionResult ContractTemp() {
            return View();
        }
     

    }
}