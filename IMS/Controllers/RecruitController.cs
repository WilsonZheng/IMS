using IMS.Common;
using IMS.Models;
using IMS.ViewModels;
using LinqKit;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class RecruitController : Controller
    {
        private IOptionProvider _optionProvider;
        private IOptionProvider OptionProvider { get { return this._optionProvider; } }

        public RecruitController() { }

        public RecruitController(IOptionProvider optionProvider)
        {
            _optionProvider = optionProvider;
        }

        private IMSUserUtil IMSUserUtil
        {
            get
            {
                if (_imsUserUtil == null)
                {
                    this._imsUserUtil = new IMSUserUtil(User, HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>());
                }
                return _imsUserUtil;
            }
        }
        private IMSUserUtil _imsUserUtil;


        // GET: Recruit
        public ActionResult Index()
        {
            var model = new RecruitIndexViewModel
            {
                RecruitStatusOptions = OptionProvider.QueryOptions<RecruitStatusType>()
            };
            return View(model);
            
        }
        
        public ActionResult List(ApplicantSearchViewModel model)
        {
            using(var db=new ApplicationDbContext())
            {
                var predicate = PredicateBuilder.True<Applicant>();
                var prdCodes = PredicateBuilder.False<Applicant>();
                if (model.RecruitStatusCodes != null)
                {
                    foreach (int code in model.RecruitStatusCodes)
                    {
                        prdCodes = prdCodes.Or(p => p.RecruitStatusTypeId == code);
                    }
                }
                predicate = predicate.And(prdCodes);
                predicate = predicate.And(p => p.IsActive && p.OrgId == IMSUserUtil.OrgId);
                var result = db.Applicants.AsExpandable().Where(predicate)
                    .Select(x=> new InvitationViewModel { Id=x.Id, Email=x.Email})
                    .ToList();
                return PartialView("_List", result);
            }
        }
        
        

        [HttpGet]
        public ActionResult NewOrModify(int? id) {
            InvitationViewModel model;
            if (id.HasValue)
            {
                using (var db = new ApplicationDbContext())
                {
                    model = db.Applicants.Where(x => x.Id == id)
                          .Select(x => new InvitationViewModel
                          {
                              Id = x.Id,
                              Email = x.Email
                          })
                          .Single();
                }
               
            }
            else
            {
                model = new InvitationViewModel();
            }
            
            return View(model);
        }


        [HttpPost]
        public ActionResult Create(InvitationViewModel model) {
            try {
                if(ModelState.IsValid)
                {
                    using(var db=new ApplicationDbContext())
                    {
                        var status = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.InvitationCreated).Single();
                        var applicant = new Applicant
                        {
                            Email = model.Email,
                            CreatedById=IMSUserUtil.Id,
                            CreatedAt=DateTime.UtcNow,
                            UpdatedById=IMSUserUtil.Id,
                            UpdatedAt=DateTime.UtcNow,
                            OrgId=IMSUserUtil.OrgId,
                            IsActive=true,
                            RecruitStatusType=status
                        };
                        db.Applicants.Add(applicant);
                        db.SaveChanges();
                    }
                    return RedirectToAction("Index");
                }
            } catch {ModelState.AddModelError("", "Request can not be processed");}
            return View("NewOrModify", model);
        }

        [HttpPost]
        public ActionResult Delete(int id) {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var applicant = db.Applicants.Where(x => x.Id == id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).Single();
                    applicant.IsActive = false;
                    db.SaveChanges();
                }
                return Json(new { });
            }
            catch
            {
                return Json(new { Error = "Request can not be processed!" });
            }

        }


        [HttpPost]
        public ActionResult Update(InvitationViewModel model) {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        var applicant = db.Applicants.Where(x => x.Id == model.Id && x.IsActive && x.OrgId == IMSUserUtil.OrgId).Single();
                        applicant.Email = model.Email;
                        db.SaveChanges();
                        return RedirectToAction("Index");
                    }
                }
            }
            catch{ModelState.AddModelError("", "Request can not be processed");}
            return View("NewOrModify", model);
        }
    }
}