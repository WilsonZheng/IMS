using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    public class ApprovementController : Controller
    {
        // GET: Approvement
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View();
        }
    }
}