using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using IMS.ViewModels;
using Microsoft.AspNet.Identity;

namespace IMS.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Contract
        public ActionResult Index()
        {
            ApplicantInfo model = new ApplicantInfo();     
            
            return View(model);
        }

        [HttpPost]
        public ActionResult AddApplicant(ApplicantInfo model)
        {

            using (var db = new ApplicationDbContext())
            {
                

                db.Applicants.Add(new Applicant
                {
                    Firstname = model.firstname,
                    Lastname = model.lastname,
                    Mobile = model.mobile,
                    MedicalCondition = model.medicalCondition,
                    Address = model.address + ", " + model.suburb,
                    Email = model.email,
                    VisaStatus = model.visaStatus,
                    IsActive = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ApplicationDt = DateTime.Now,
                    CreatedById = User.Identity.GetUserId<int>(),
                    UpdatedById = User.Identity.GetUserId<int>(),
                    OrgId = 1,
                    RecruitStatusTypeId=db.RecruitStatusType.Where(x => x.Code.Equals("D")).Single().Id


                });
                db.SaveChanges();
                return View(model);
            }


            
               
            
            
            
            
        }
    }
    
}