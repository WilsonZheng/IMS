using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    public class TemplateManageController : Controller
    {
        // GET: TemplateManage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Email() {
         
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Templates.Where(x => x.TemplateType.Code.Equals("ET")).ToList();
                    return View(result);
                }         
           
        }

        public ActionResult NewEmail() {
            return View();
        }

        public ActionResult TempContract() {
            return View();
        }



       


      

    }
}