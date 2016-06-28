using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Contract
        public ActionResult Index()
        {
            var m = new
            {
                Name = "John Henderson",
                KiwiName = "johnny",
                Address = "480 Queens St",
                Suburb = "Auckland",
                Email = "john@gmail.com",
                Mobile = "021123456",
                VisaStatus = "Citizen",
                MedicalCondition = "None",
                Signature = "signed here",
                Date = "2/5/2016"
            };
            using(var db= new ApplicationDbContext())
            {
                var template = db.Templates.Where(x=> x.Id==2).Single();
                var content = Encoding.UTF8.GetString(template.Content);
                var html=IMS.Media.DocGenerator.Html(content, m);
                IMS.Media.DocGenerator.Pdf(html, @"D:\test.pdf");
            }
            
            
            return View();
        }
    }
}