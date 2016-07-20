using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    [Authorize]
    public class AppMainController : Controller
    {
        // GET: Main
        public ActionResult Index()
        {
            return View();
        }
    }
}