using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using IMS.ViewModels;
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
                    
                    

                });
                db.SaveChanges();
                return View(model);
            }


            
               
            
            
            
            
        }
    }
    
}