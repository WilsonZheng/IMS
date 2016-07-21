using IMS.Common;
using IMS.Models;
using IMS.ViewModels;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using LinqKit;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class InvitationController : Controller
    {

        private IOptionProvider _optionProvider;
        private IOptionProvider OptionProvider { get { return this._optionProvider; } }
        private IEmailProvider _emailProvier;
        private IEmailProvider EmailProvider { get { return this._emailProvier; } }

        public InvitationController() { }

        public InvitationController(IOptionProvider optionProvider, IEmailProvider emailProvider)
        {
            _optionProvider = optionProvider;
            _emailProvier = emailProvider;
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
             

        [HttpPost]
        public ActionResult RecruitStatus(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Invitations
                        .Where(x => x.TemplateId == id)
                        .Include(x => x.RecruitStatusType)
                        .GroupBy(x => x.RecruitStatusType.Code)
                        .Select(x => new {Key =x.Key,Count = x.Count()})
                        .ToList();

                    var status = new RecruitStatusViewModel
                    {
                        Total = result.Sum(x => x.Count),
                        Sent = result.Where(x => x.Key == (int)RecruitStatusCode.InvitationSent).Sum(x => x.Count),
                        Received = result.Where(x => x.Key == (int)RecruitStatusCode.ContractReceived).Sum(x => x.Count),
                        Approved = result.Where(x => x.Key == (int)RecruitStatusCode.Approved).Sum(x => x.Count)
                    };
                    return Json(new ImsResult { Data = status });
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }
        

        public ActionResult Send(InvitationBatchViewModel model)
        {
            try
            {
                StringBuilder smtpError = new StringBuilder();
                if (!ModelState.IsValid) throw new Exception("Invalid Input!");
                //To check the placeholder for the invitation link.
                if (!model.Content.Contains(IMSContants.INVITATION_CODE_PLACEHOLER)) throw new Exception("Invitation Code Placeholder is missing!");

                var invitationQueue = new List<Invitation>();
                RecruitStatusType recruitStatusType;
                using (var db = new ApplicationDbContext())
                {
                    var template = db.Templates.Where(x => x.Id == model.NoticeId && x.IsActive && x.OrgId == IMSUserUtil.OrgId && x.TemplateType.Code == (int)TemplateTypeCode.Email).SingleOrDefault();
                    if (template == null) throw new Exception("Invalid Notice");
                    //To prevent sending a duplicate invitation.
                    var duplicates = db.Invitations.Where(x => x.TemplateId == model.NoticeId && model.Emails.Contains(x.Email)).ToList();
                    if (duplicates.Count() > 0)
                    {
                        throw new Exception(string.Format("Duplicated request: {0}", string.Join(", ", duplicates.Select(x => x.Email).ToArray())));
                    }
                    recruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();
                }

                //To avoid holding db resource too long, make the following smtp job done separately.
                //After finishing smtp job, get db connection to save the record. 
                foreach (var email in model.Emails.Distinct())
                {
                   try {
                        var invitationCode = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()));
                        var link = string.Format("<a href='{0}?invitationCode={1}'>{0}?invitationCode={1}</a>", IMSEnvProperties.ContractEndPoint, invitationCode);
                        var html = model.Content.Replace(IMSContants.INVITATION_CODE_PLACEHOLER, link);
                        EmailProvider.Send(model.Subject, email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
                        var invitation = new Invitation
                        {
                            TemplateId = model.NoticeId,
                            Email = email,
                            Subject = model.Subject,
                            Content = html,
                            RecruitStatusTypeId = recruitStatusType.Id,
                            InvitationCode = invitationCode,
                            SentAt = DateTime.UtcNow,
                            CreatedById = IMSUserUtil.Id,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedById = IMSUserUtil.Id,
                            UpdatedAt = DateTime.UtcNow
                        };
                        invitationQueue.Add(invitation);
                    } catch
                    {
                        smtpError.Append(string.Format(" {0} ",email));
                    }
                }
                //Save the log only for successful invitation.
                //Return the list of failed invitation as an error message.
                using(var db=new ApplicationDbContext())
                {
                    db.Invitations.AddRange(invitationQueue);
                    db.SaveChanges();
                }
                if (smtpError.Length>0) throw new Exception(string.Format("SMTP Error:{0}", smtpError.ToString()));
                return Json(new ImsResult {});
            }
            catch (Exception e) { return Json(new ImsResult { Error = e.Message }); }
        }
        
        [HttpPost]
        public ActionResult Search(ProgressSearchViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var predicate = PredicateBuilder.True<Invitation>().And(p => p.EmailTemplate.OrgId == IMSUserUtil.OrgId);
                    if (model.NoticeIds.Count() > 0)
                    {
                        predicate = predicate.And(model.NoticeIdPredicate);
                    }
                    if(model.RecruitStatusCodes.Count() > 0)
                    {
                        predicate = predicate.And(model.RecruitStatusCodePredicate);
                    }
                    var result = db.Invitations
                        .Include(x=>x.RecruitStatusType)
                        .Include(x=>x.EmailTemplate)
                        .AsExpandable()
                        .Where(predicate).ToList()
                        .Select(x=>new InvitationViewModel{
                            NoticeId=x.TemplateId,
                            NoticeName=x.EmailTemplate.Name,
                            Email =x.Email,
                            RecruitStatusCode =x.RecruitStatusType.Code })
                        .OrderByDescending(x => x.Email)
                    .ToList();
                    return Json(new ImsResult { Data=result});
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }


        [HttpPost]
        public ActionResult Delete(InvitationViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Invitations.Where(x => x.Email == model.Email && x.TemplateId == model.NoticeId && x.EmailTemplate.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (result == null) throw new Exception("Not found");
                    db.Invitations.Remove(result);
                    db.SaveChanges();
                    return Json(new ImsResult { });
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        public ActionResult Resend(InvitationViewModel model)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Invitations.Where(x => x.Email == model.Email && x.TemplateId == model.NoticeId && x.EmailTemplate.OrgId == IMSUserUtil.OrgId).SingleOrDefault();
                    if (result == null) throw new Exception("Not found");
                    EmailProvider.Send(result.Subject,model.Email,result.Content, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
                    return Json(new ImsResult { });
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }
    }
}