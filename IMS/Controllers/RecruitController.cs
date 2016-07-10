﻿using IMS.Common;
using IMS.Media;
using IMS.Models;
using IMS.ViewModels;
using LinqKit;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class RecruitController : Controller
    {
        private IOptionProvider _optionProvider;
        private IOptionProvider OptionProvider { get { return this._optionProvider; } }
        private IEmailProvider _emailProvier;
        private IEmailProvider EmailProvider { get { return this._emailProvier; } }

        public RecruitController() { }

        public RecruitController(IOptionProvider optionProvider,IEmailProvider emailProvider)
        {
            _optionProvider = optionProvider;
            _emailProvier   = emailProvider;
        }

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

        // GET: Recruit
        public ActionResult Index(RecruitStatusCode? code)
        {
            var model = new RecruitIndexViewModel
            {
                RecruitStatusOptions = OptionProvider.QueryOptions<RecruitStatusType>(code.HasValue && (code >= RecruitStatusCode.InvitationCreated && code <= RecruitStatusCode.Approved)? (int)code:(int)RecruitStatusCode.InvitationCreated)
            };
            return View(model);
            
        }
        
        public ActionResult List(ApplicantSearchViewModel model)
        {
            using(var db=new ApplicationDbContext())
            {
                var predicate = PredicateBuilder.True<Applicant>().And(p => p.IsActive && p.OrgId == IMSUserUtil.OrgId);
                predicate = predicate.And(model.RecruitStatusTypeIdsPredicate);
                var result = db.Applicants.AsExpandable().Where(predicate).OrderByDescending(x=>x.Id)
                    .Select(x=> new InvitationViewModel { Id=x.Id, Email=x.Email})
                    .ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
  
        [HttpGet]
        public ActionResult NewOrModify(int? id) {
            InvitationViewModel model;
            if (id.HasValue)
            {
                using (var db = new ApplicationDbContext())
                {
                    model = db.Applicants.Where(x => x.Id == id)
                          .Select(x => new InvitationViewModel
                          {
                              Id = x.Id,
                              Email = x.Email
                          })
                          .Single();
                }
               
            }
            else
            {
                model = new InvitationViewModel();
            }
            
            return View(model);
        }


        [HttpPost]
        public ActionResult Create(InvitationViewModel model) {
            try {
                if(ModelState.IsValid)
                {
                    using(var db=new ApplicationDbContext())
                    {
                        var status = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationCreated).Single();
                        var applicant = new Applicant
                        {
                            Email = model.Email,
                            CreatedById=IMSUserUtil.Id,
                            CreatedAt=DateTime.UtcNow,
                            UpdatedById=IMSUserUtil.Id,
                            UpdatedAt=DateTime.UtcNow,
                            OrgId=IMSUserUtil.OrgId,
                            IsActive=true
                            //RecruitStatusType=status,
                            //InvitationCode= Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()))
                        };
                        db.Applicants.Add(applicant);
                        db.SaveChanges();
                    }
                    
                }
                else
                {
                    throw new Exception("Input value is not valid!");
                }
            } catch(Exception e){ return Json(new { Error = e.Message });}
            return Json(new { });
        }

        [HttpPost]
        public ActionResult Delete(int id) {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var applicant = db.Applicants.Where(x => x.Id == id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).Single();
                    applicant.IsActive = false;
                    db.SaveChanges();
                }
                return Json(new { });
            }
            catch
            {
                return Json(new { Error = "Request can not be processed!" });
            }

        }


        [HttpPost]
        public ActionResult Update(InvitationViewModel model) {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        var applicant = db.Applicants.Where(x => x.Id == model.Id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).Single();
                        applicant.Email = model.Email;
                        db.SaveChanges();
                        return RedirectToAction("Index");
                    }
                }
            }
            catch{ModelState.AddModelError("", "Request can not be processed");}
            return View("NewOrModify", model);
        }
        
        //[HttpPost]
        //public ActionResult SendBatchInvitation()
        //{
        //    using (var db = new ApplicationDbContext())
        //    {
        //        try { 
        //                    var template = db.Templates.Where(x => x.TemplateType.Code == (int)TemplateTypeCode.Email
        //                                                          && x.IsActive
        //                                                          && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
        //                    if (template == null) throw new Exception("No Template Found!");
        //                    var content = Encoding.UTF8.GetString(template.Content);
        //                    var applicants = db.Applicants.Where(x => x.OrgId == IMSUserUtil.OrgId && x.IsActive && x.RecruitStatusType.Code==(int)RecruitStatusCode.InvitationCreated).ToList();
        //                    if (applicants.Count() == 0) throw new Exception("No Available Invitation Found!");

        //                    var newRecruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();

                            

        //                    foreach (var applicant in applicants)
        //                    {
        //                        try
        //                        {
        //                            var link = string.Format("{0}?invitationCode={1}&id={2}", IMSEnvProperties.ContractEndPoint, applicant.InvitationCode, applicant.Id);
        //                            var html = DocGenerator.Html(content, new { Link = link });
        //                            EmailProvider.Send("Notice", applicant.Email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
        //                            applicant.InvitationContent = html;
        //                            applicant.RecruitStatusType = newRecruitStatusType;
        //                            applicant.InvitationDt = DateTime.UtcNow;
        //                        }
        //                        catch
        //                        {
        //                            throw new Exception("Processing template and Smtp job Failed!");
        //                        }
        //                    }
        //                    return Json(new {});
        //            }
        //            catch (Exception e)
        //            {
        //                return Json(new { Error = e.Message });
        //            }
        //            finally
        //            {
        //                 db.SaveChanges();
        //            }
        //    }
        //}
       // [HttpPost]
        //public ActionResult SendInvitation(int id)
        //{
        //    using (var db = new ApplicationDbContext())
        //    {
        //        try
        //        {
        //            var template = db.Templates.Where(x => x.TemplateType.Code == (int)TemplateTypeCode.Email
        //                                                  && x.IsActive
        //                                                  && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
        //            if (template == null) throw new Exception("No Template Found!");
        //            var content = Encoding.UTF8.GetString(template.Content);
        //            var applicant = db.Applicants.Include(x=>x.RecruitStatusType).Where(x => x.OrgId == IMSUserUtil.OrgId && x.IsActive && x.Id==id).Single();
        //            var newRecruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();
        //            try
        //            {
        //                var link = string.Format("{0}?invitationCode={1}&id={2}", IMSEnvProperties.ContractEndPoint, applicant.InvitationCode, applicant.Id);
        //                var html = DocGenerator.Html(content, new { Link = link });
        //                EmailProvider.Send("Notice", applicant.Email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
        //                applicant.InvitationContent = html;
        //                if(applicant.RecruitStatusType.Code<newRecruitStatusType.Code)applicant.RecruitStatusType = newRecruitStatusType;
        //                applicant.InvitationDt = DateTime.UtcNow;
        //                db.SaveChanges();
        //                return Json(new { Error = "", RecruitStatusTypeCode= applicant.RecruitStatusType.Code});
        //            }
        //            catch
        //            {
        //                throw new Exception("Processing template and Smtp job Failed!");
        //            }
                   
        //        }
        //        catch (Exception e)
        //        {
        //            return Json(new { Error = e.Message });
        //        }
               
        //   }
       // }
    }
}