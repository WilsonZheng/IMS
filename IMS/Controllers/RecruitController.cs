
using IMS.Common;
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
using Newtonsoft.Json;

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
        
        //public ActionResult List(InvitationSearchViewModel model)
        //{
        //    using(var db=new ApplicationDbContext())
        //    {
        //        var predicate = PredicateBuilder.True<Invitation>().And(p => p.EmailTemplate.OrgId == IMSUserUtil.OrgId);
        //        predicate = predicate.And(model.RecruitStatusTypeIdsPredicate);
        //        var result = db.Invitations.AsExpandable().Where(predicate).OrderByDescending(x=>x.CreatedAt)
        //            .Select(x=> new InvitationViewModel { TemplateId=x.TemplateId,Email=x.Email})
        //            .ToList();
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //}
  
        [HttpGet]
        public ActionResult NewOrModify(int? id) {
            //InvitationViewModel model = new InvitationViewModel();
            //if (id.HasValue)
            //{
            //    //using (var db = new ApplicationDbContext())
            //{
            //    model = db.Applicants.Where(x => x.Id == id)
            //          .Select(x => new InvitationViewModel
            //          {
            //              Id = x.Id,
            //              Email = x.Email
            //          })
            //          .Single();
            //}

            //}
            //else
            //{
            //    model = new InvitationViewModel();
            //}

            //return View(model);
            return null;
        }


        //[HttpPost]
        //public ActionResult Create(InvitationViewModel model) {
        //    try {
        //        if(ModelState.IsValid)
        //        {
        //            using(var db=new ApplicationDbContext())
        //            {
        //                var status = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationCreated).Single();
        //                var user = IMSUserUtil.AttachedUser(db);
        //                var invitation = new Invitation
        //                {
        //                    EmailTemplate = db.Templates.Where(x => x.OrgId == IMSUserUtil.OrgId && x.IsActive && x.TemplateType.Code == (int)TemplateTypeCode.Email).Single(),
        //                    Email = model.Email,
        //                    RecruitStatusType = status,
        //                    CreatedAt=DateTime.UtcNow,
        //                    UpdatedAt=DateTime.UtcNow,
        //                    IsSent=false,
        //                    CreatedBy=user,
        //                    UpdatedBy=user,
        //                    InvitationCode = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()))
        //                };
        //                db.Invitations.Add(invitation);
        //                db.SaveChanges();
        //            }
                    
        //        }
        //        else
        //        {
        //            throw new Exception("Input value is not valid!");
        //        }
        //    } catch(Exception e){ return Json(new { Error = e.Message });}
        //    return Json(new { });
        //}




        [HttpPost]
        public ActionResult SendBatchInvitation()
        {
            using (var db = new ApplicationDbContext())
            {
                try
                {
                    var template = db.Templates.Where(x => x.TemplateType.Code == (int)TemplateTypeCode.Email
                                                          && x.IsActive
                                                          && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (template == null) throw new Exception("No Template Found!");
                    var content =JsonConvert.DeserializeObject<EmailTemplateContentViewModel>(Encoding.UTF8.GetString(template.Content));
                    var invitations = db.Invitations.Where(x => x.EmailTemplate.OrgId == IMSUserUtil.OrgId  && x.RecruitStatusType.Code == (int)RecruitStatusCode.InvitationCreated).ToList();
                    if (invitations.Count() == 0) throw new Exception("No Available Invitation Found!");

                    var newRecruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();
                    
                    foreach (var invitation in invitations)
                    {
                        try
                        {
                            var link = string.Format("{0}?invitationCode={1}", IMSEnvProperties.ContractEndPoint,invitation.InvitationCode);
                            var html = DocGenerator.Html(content.DefaultContent, new { Link = link });
                            EmailProvider.Send(content.DefaultSubject, invitation.Email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
                            invitation.Content = html;
                            invitation.RecruitStatusType = newRecruitStatusType;
                            invitation.SentAt = DateTime.UtcNow;
                            invitation.Subject = "Notice";
                        }
                        catch
                        {
                            throw new Exception("Processing template and Smtp job Failed!");
                        }
                    }
                    return Json(new { });
                }
                catch (Exception e)
                {
                    return Json(new { Error = e.Message });
                }
                finally
                {
                    db.SaveChanges();
                }
            }
        }


        //[HttpPost]
        //public ActionResult SendInvitation(InvitationViewModel model)
        //{
        //    using (var db = new ApplicationDbContext())
        //    {
        //        try
        //        {
        //            var template = db.Templates.Where(x => x.TemplateType.Code == (int)TemplateTypeCode.Email
        //                                                  && x.IsActive
        //                                                  && x.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
        //            if (template == null) throw new Exception("No Template Found!");
        //            var content =  JsonConvert.DeserializeObject<EmailTemplateContentViewModel>(Encoding.UTF8.GetString(template.Content));
        //            var invitation = db.Invitations.Include(x => x.RecruitStatusType).Where(x => x.EmailTemplate.OrgId == IMSUserUtil.OrgId && x.TemplateId==model.TemplateId && x.Email==model.Email).Single();
        //            var newRecruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();
        //            try
        //            {
        //                var link = string.Format("{0}?invitationCode={1}", IMSEnvProperties.ContractEndPoint, invitation.InvitationCode);
        //                var html = DocGenerator.Html(content.DefaultContent, new { Link = link });
        //                EmailProvider.Send(content.DefaultSubject, invitation.Email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
        //                invitation.Content = html;
        //                if (invitation.RecruitStatusType.Code < newRecruitStatusType.Code) invitation.RecruitStatusType = newRecruitStatusType;
        //                invitation.SentAt = DateTime.UtcNow;
        //                db.SaveChanges();
        //                return Json(new { Error = "", RecruitStatusTypeCode = invitation.RecruitStatusType.Code });
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

        //    }
        //}
    }
}