using IMS.Common;
using IMS.Models;
using IMS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Text.RegularExpressions;

namespace IMS.Controllers
{
    public class ApprovementController : Controller
    {
        private IOptionProvider _optionProvider;
        private IOptionProvider OptionProvider { get { return this._optionProvider; } }
        private IEmailProvider _emailProvier;
        private IEmailProvider EmailProvider { get { return this._emailProvier; } }
        public ApprovementController(IOptionProvider optionProvider, IEmailProvider emailProvider)
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


        // GET: Approvement
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "admin")]
        public ActionResult GetList()
        {
            using (var db = new ApplicationDbContext())
            {


                var applicants = db.Applicants.Where(
                    x => x.IsActive == true &&
                    x.Invitation.RecruitStatusType.Code == (int)RecruitStatusCode.ContractReceived)
                    .Select(x => new DisplayApplicantsViewModel()
                    {

                        Firstname = x.Firstname,
                        Lastname = x.Lastname,
                        TemplateId = x.TemplateId.ToString(),
                        Email = x.Email,
                        Mobile = x.Mobile,
                        VisaStatus = x.VisaStatus,
                        MedicalCondition = x.MedicalCondition,
                        ContractFileLocation = x.TemplateId + "_" + x.Email + "_Contract_Passport.pdf",
                        ProgramName = x.Program.Name
                    }).ToList();


                return Json(new { data = applicants }, JsonRequestBehavior.AllowGet);
            }


        }

        

        [Authorize(Roles = "admin")]
        public ActionResult DownloadFile(string path)
        {
            //string filename = "File.pdf";
            string filepath = IMSEnvProperties.ContractFileLocation + path;
            byte[] filedata = System.IO.File.ReadAllBytes(filepath);
            string contentType = MimeMapping.GetMimeMapping(filepath);

            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = path,
                Inline = true,
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());

            return File(filedata, contentType);
        }


        [Authorize(Roles = "admin")]
        public ActionResult DisplayPDF(string path)
        {
            ViewBag.FileName = path;
            return PartialView();
        }

        [Authorize(Roles = "admin")]
        public ActionResult ApproveApplicant(string email,int templateId)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    
                    
                    var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                    var applicant = db.Applicants.Where(x => x.Email == email && x.TemplateId == templateId).Include(x=>x.Invitation).Single();
                    User user = userManager.FindByEmail(email);

                    //check if the user account already exist
                    if (user == null)
                    {
                        string role;
                        role = "intern";
                        


                        //generate random password
                        var password = System.Web.Security.Membership.GeneratePassword(6, 0);
                        Random rnd = new Random();
                        password = Regex.Replace(password, @"[^a-zA-Z0-9]", m => rnd.Next(0, 10).ToString());
                        
                        
                        // use identity to create new user
                        userManager.Create(new User
                        {
                            UserName = email,
                            Email = email,
                            OrgId = IMSUserUtil.OrgId,
                            FirstName = applicant.Firstname,
                            LastName = applicant.Lastname
                        }, password);

                        //get the created user
                        user = userManager.FindByName(email);
                        //add role(intern) to the user above
                        userManager.AddToRole(user.Id, role);

                        //add new internship related to the new user
                        var userId = user.Id;
                        var commenceAt = DateTime.UtcNow.Date;
                        var expiryAt = DateTime.UtcNow.AddDays(90+1).Date;
                        var intern = db.Users.Where(x => x.Id == userId).Single();
                        var internship = new Internship {
                            Id = userId,
                            CommenceAt = commenceAt,
                            ExpiryAt = expiryAt,
                            Intern = intern

                        };
                        

                        db.Internships.Add(internship);

                        //update the applicant status to approved
                        var statusApproved = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.Approved).Single();

                        var invitation = db.Invitations.Where(x => x.InvitationCode == applicant.Invitation.InvitationCode && x.RecruitStatusType.Code == (int)RecruitStatusCode.ContractReceived).Single();
                        invitation.RecruitStatusType = statusApproved;

                        

                        //save all changes to database
                        db.SaveChanges();

                        //send account details email to user
                        String subject = "IMS Login Account Details";
                        String content = "Your login user name: " + email +"."+ "\r\n" + "Your password: " + password +"."+ "\r\n" + "You can change your password after you logged in IMS. Thank you.";
                        EmailProvider.Send(subject, email, content, IMSEnvProperties.GmailAccount, IMSEnvProperties.GmailAppPassword);

                        //result message  shown in the front end
                        ViewBag.msg = "Create account successful and notification sent to the applicant.";
                        return PartialView();
                    }
                    else
                    {
                        
                        //update the old account with new info
                        user.FirstName = applicant.Firstname;
                        user.LastName = applicant.Lastname;
                        user.OrgId = IMSUserUtil.OrgId;
                        userManager.Update(user);
                        var internship = db.Internships.Where(x => x.Id == user.Id).Single();
                        internship.CommenceAt = DateTime.UtcNow;
                        internship.ExpiryAt = DateTime.UtcNow.AddDays(90);


                        //update the applicant status to approved
                        var statusApproved = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.Approved).Single();
                        var invitation = db.Invitations.Where(x => x.InvitationCode == applicant.Invitation.InvitationCode && x.RecruitStatusType.Code == (int)RecruitStatusCode.ContractReceived).Single();
                        invitation.RecruitStatusType = statusApproved;
                        

                        //save all changes to database
                        db.SaveChanges();

                        //result message  shown in the front end
                        ViewBag.msg = "Account existed before and updated now.";
                        return PartialView();
                    }
                    


                   
                }
                
            }
            catch(Exception e)
            {
                ViewBag.msg = e.ToString();
                return PartialView();
            }
            
        }


    }
}