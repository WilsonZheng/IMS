using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class ConfigurationController : Controller
    {
        // GET: Configuration
        public ActionResult Smtp()
        {
            return View();
        }
    }
}