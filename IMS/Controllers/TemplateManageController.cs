using IMS.Models;
using IMS.ViewModels;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Data.Entity;
using System;
using System.Web;
using IMS.Common;
using Microsoft.AspNet.Identity.Owin;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class TemplateManageController : Controller
    {

        private IMSUserUtil IMSUserUtil
        {
            get
            {
                if (_imsUserUtil == null)
                {
                    this._imsUserUtil = new IMSUserUtil(this.User, HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>());
                }
                return _imsUserUtil;
            }
        }
        private IMSUserUtil _imsUserUtil;


        // GET: TemplateManage
        public ActionResult Index()
        {
            return View();
        }

        
        
        public ActionResult List()
        {
            using (var db = new ApplicationDbContext())
            {
                if (db.Templates.Where(x => x.Org.Id == IMSUserUtil.OrgId).Count() == 0)
                {
                    foreach(var tmpType in db.TemplateTypes.Where(x => x.IsActive).ToList())
                    {
                        db.Templates.Add(new Template
                        {
                            IsActive = false,
                            Content = Encoding.UTF8.GetBytes("<html></html>"),
                            TemplateType = tmpType,
                            OrgId = IMSUserUtil.OrgId,
                            CreatedBy =IMSUserUtil.AttachedUser(db),
                            CreatedAt = DateTime.UtcNow
                        });
                    }
                    db.SaveChanges();
                }
                var result = db.Templates
                    .Where(x => x.OrgId == IMSUserUtil.OrgId)
                    .Select(x => new TemplateListViewModel { Id = x.Id, Description = x.TemplateType.Description, IsActive = x.IsActive }).ToList();
                return PartialView("_TemplateList",result);
            }
        }

        public ActionResult New() {
                return View("NewOrModify", new TemplateViewModel());
        }

        public ActionResult Edit(int id)
        {
            using(var db=new ApplicationDbContext())
            {
                var model=db.Templates
                    .Include(x=>x.TemplateType)
                    .Where(x => x.Id == id && x.OrgId== IMSUserUtil.OrgId)
                    .ToList()
                    .Select(x=>new TemplateViewModel {
                        Id = x.Id,
                        Code = x.TemplateType.Code,
                        Content = x.Content!=null?Encoding.UTF8.GetString(x.Content):""
                    }).Single();
                return PartialView("_NewOrModify",model);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Update(TemplateViewModel model)
        {
            try {
                if (ModelState.IsValid)
                {
                    using (var db = new ApplicationDbContext())
                    {
                        var existing = db.Templates.Where(x => x.Id == model.Id && x.OrgId == IMSUserUtil.OrgId).Single();
                        existing.Content = Encoding.UTF8.GetBytes(model.Content);
                        db.SaveChanges();
                        return Json(new { });
                    }
                }
            } catch
            {
                ModelState.AddModelError("", "Request can not be processed!");
            }
            Response.StatusCode = 400;
            return PartialView("_NewOrModify",model);
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ToggleIsActive(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Templates.Where(x => x.Id == id && x.OrgId== IMSUserUtil.OrgId).Single();
                    result.IsActive = !result.IsActive;
                    db.SaveChanges();
                    return Json(new{result="OK"});
                }
            }
            catch {
                return Json(new {Error="Exception"});
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(TemplateViewModel model)
        {
            if (ModelState.IsValid)
            {
                try {

                    using (var db = new ApplicationDbContext())
                    {
                        var userid  = IMSUserUtil.Id;
                        var orgId   = IMSUserUtil.OrgId;
                        var user    = IMSUserUtil.AttachedUser(db);
                      
                        var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)&& x.IsActive).Single();
                        var template = new Template
                        {
                            IsActive = true,
                            Content = Encoding.UTF8.GetBytes(model.Content),
                            TemplateType = templateType,
                            OrgId = orgId,
                            CreatedBy = user,
                            CreatedAt = DateTime.UtcNow
                        };
                        db.Templates.Add(template);
                        db.SaveChanges();
                        return RedirectToAction("Index");
                    }

                } catch {
                    ModelState.AddModelError("","Request can not be processed" );
                }
                
            }
            return View("NewOrModify",model);
        }


        public ActionResult ContractTemp() {
            return View();
        }



       


      

    }
}