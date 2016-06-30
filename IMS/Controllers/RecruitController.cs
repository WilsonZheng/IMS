using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class RecruitController : Controller
    {
        // GET: Recruit
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult List()
        {
            return PartialView("_List");
        }



    }
}