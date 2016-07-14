using IMS.Common;
using IMS.Media;
using IMS.Models;
using IMS.ViewModels;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using System.Data.Entity;

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



        // GET: Invitation
        public ActionResult Index()
        {
            return View();
        }

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
                        Saved = result.Where(x => x.Key == (int)RecruitStatusCode.InvitationCreated).Sum(x => x.Count),
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
        

        public ActionResult Save(InvitationBatchViewModel model) {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        //Check duplicate.
                        var duplicates = db.Invitations.Where(x => x.TemplateId == model.NoticeId && model.Emails.Contains(x.Email)).ToList();
                        if (duplicates.Count() > 0)
                        {
                            throw new Exception(string.Format("Duplicated request: {0}", string.Join(", ", duplicates.Select(x => x.Email).ToArray())));
                        }
                        var status = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationCreated).Single();
                        var template = db.Templates.Where(x => x.Id == model.NoticeId && x.OrgId == IMSUserUtil.OrgId && x.IsActive && x.TemplateType.Code == (int)TemplateTypeCode.Email).Single();
                        var user = IMSUserUtil.AttachedUser(db);
                        foreach(var email in model.Emails) {
                            var invitation = new Invitation
                            {
                                TemplateId = template.Id,
                                Email = email,
                                Subject=model.Subject,
                                Content=model.Content,
                                RecruitStatusType = status,
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow,
                                IsSent = false,
                                CreatedBy = user,
                                UpdatedBy = user,
                                InvitationCode = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()))
                            };
                            db.Invitations.Add(invitation);
                        }
                        db.SaveChanges();
                        return Json(new ImsResult());
                    }
                }
                else
                {
                    throw new Exception("Input value is not valid!");
                }
            }
            catch (Exception e) { return Json(new ImsResult{ Error = e.Message }); }
       }

        public ActionResult Send(InvitationBatchViewModel model)
        {
            try
            {
                if (!ModelState.IsValid) throw new Exception("Invalid Input!");
                var invitationQueue = new List<Invitation>();
                RecruitStatusType newRecruitStatusType;
                using (var db = new ApplicationDbContext())
                {
                    //Check duplicate.
                    var duplicates=db.Invitations.Where(x => x.TemplateId == model.NoticeId && model.Emails.Contains(x.Email)).ToList();
                    if (duplicates.Count() > 0)
                    {
                        throw new Exception(string.Format("Duplicated request: {0}", string.Join(", ", duplicates.Select(x => x.Email).ToArray())));
                    }


                    var template = db.Templates.Where(x => x.Id == model.NoticeId && x.IsActive && x.OrgId == IMSUserUtil.OrgId && x.TemplateType.Code == (int)TemplateTypeCode.Email).Single();
                    newRecruitStatusType = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationSent).Single();
                    var status = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationCreated).Single();
                    var user = IMSUserUtil.AttachedUser(db);

                    foreach (var email in model.Emails.Distinct())
                    {
                        var invitation = new Invitation
                        {
                            TemplateId = template.Id,
                            Email = email,
                            Subject = model.Subject,
                            Content = model.Content,
                            RecruitStatusType = status,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow,
                            IsSent = false,
                            CreatedBy = user,
                            UpdatedBy = user,
                            InvitationCode = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()))
                        };
                        invitationQueue.Add(invitation);
                    }
                    db.Invitations.AddRange(invitationQueue);
                    db.SaveChanges();
                }

                StringBuilder sb = new StringBuilder();
                foreach (var invitation in invitationQueue)
                {
                    try
                    {
                        var link = string.Format("<a href='{0}?invitationCode={1}'>{0}?invitationCode={1}</a>", IMSEnvProperties.ContractEndPoint, invitation.InvitationCode);
                        var html = invitation.Content.Replace(IMSContants.INVITATION_CODE_PLACEHOLER,link);
                        //check if the invitation_code_placeholder is missing. if that is the case, skip to the next.
                        if (html.Equals(invitation.Content)) {
                            sb.Append(invitation.Email);
                            sb.Append(":Missing PlaceHolder ");
                            continue;
                        }
                       
                        EmailProvider.Send(invitation.Subject, invitation.Email, html, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);
                        invitation.Content = html;
                        invitation.RecruitStatusTypeId = newRecruitStatusType.Id;
                        invitation.SentAt = DateTime.UtcNow;
                        
                       
                    }
                    catch
                    {
                        sb.Append(invitation.Email);
                        sb.Append(":Smtp relating Error");
                        
                        //possibly
                        //1. invalid email(well formatted but invalid)
                        //2. smtp connection error.
                        //3. something else.
                    }
                }

                //Save invitation regardless of whether it has been sent or not.
                using(var db=new ApplicationDbContext())
                {
                    var targets = db.Invitations.Where(x => x.TemplateId == model.NoticeId && model.Emails.Contains(x.Email)).ToList();
                    Invitation old;
                    foreach (var target in targets)
                    {
                        old = invitationQueue.Where(x => x.Email.Equals(target.Email)).Single();
                        target.Content              =  old.Content;
                        target.RecruitStatusTypeId = old.RecruitStatusTypeId;
                        target.SentAt = old.SentAt;
                    }
                    db.SaveChanges();
                }
                return Json(new ImsResult { Error=sb.ToString()});
            }
            catch (Exception e) { return Json(new ImsResult { Error = e.Message }); }
        }
    }
}