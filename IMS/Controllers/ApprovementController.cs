using IMS.Common;
using IMS.Models;
using IMS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace IMS.Controllers
{
    public class ApprovementController : Controller
    {
        // GET: Approvement
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View("");
        }

        [Authorize(Roles = "admin")]
        public ActionResult GetList(jQueryDataTableParamModel param)
        {
            using (var db = new ApplicationDbContext())
            {
                //IEnumerable<DisplayApplicantsViewModel> applicants;
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
                        //Invitation = x.Invitation,
                    }).ToList();

                //List<DisplayApplicantsViewModel> result = applicants.ToList();
                var json = new JavaScriptSerializer().Serialize(applicants);
                return Json(json, JsonRequestBehavior.AllowGet);
            }


        }

    }
}