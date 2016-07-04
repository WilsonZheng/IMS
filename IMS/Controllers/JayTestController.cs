using IMS.Models;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web.Mvc;
using System.Web.Security;

namespace IMS.Controllers
{
    public class JayTestController : Controller
    {
        // GET: JayTest
        public ActionResult Index()
        {
           
            //using (var db = new ApplicationDbContext())
            //{
            //    var userid = User.Identity.GetUserId<int>();

            //    ClaimsPrincipal cp = User as ClaimsPrincipal;
                
            //    var orgId=cp.Claims.Where(x => x.Type.Equals("OrgId")).Select(x => x.Value).FirstOrDefault();

            //    var user = db.Users.Find(userid);
                
            //    var u = User.Identity;
                
            //}
        

            //var m = new
            //{
            //    Name = "John Henderson",
            //    KiwiName = "johnny",
            //    Address = "480 Queens St",
            //    Suburb = "Auckland",
            //    Email = "john@gmail.com",
            //    Mobile = "021123456",
            //    VisaStatus = "Citizen",
            //    MedicalCondition = "None",
            //    Signature = "signed here",
            //    Date = "2/5/2016"
            //};
            //using (var db = new ApplicationDbContext())
            //{
            //    var template = db.Templates.Where(x => x.TemplateType.Code.Equals("CT") && x.IsActive).OrderByDescending(x => x.Id).First();
            //    var content = Encoding.UTF8.GetString(template.Content);
            //    var html = IMS.Media.DocGenerator.Html(content, m);
            //    IMS.Media.DocGenerator.Pdf(html, @"C:\Users\jeong\test.pdf");
            //}
            return View();
        }
    }
}