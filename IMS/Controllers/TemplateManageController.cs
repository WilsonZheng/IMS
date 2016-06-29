using IMS.Models;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using System;
using System.Web;
using System.Security.Claims;
using IMS.Common;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class TemplateManageController : Controller
    {
        // GET: TemplateManage
        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult List()
        {
            using (var db = new ApplicationDbContext())
            {
                var orgId = Convert.ToInt32((User as ClaimsPrincipal).Claims.Where(x => x.Type.Equals(IMSContants.OrgId)).Select(x => x.Value).Single());
                var result = db.Templates
                    .Include(x => x.TemplateType)
                    .Include(x=>x.CreatedBy)
                    .Where(x=>x.Org.Id==orgId).ToList();
                return PartialView("_TemplateList",result);
            }
        }

        public ActionResult New() {
            using(var db=new ApplicationDbContext())
            {
                var options = db.TemplateTypes.Select(x => new SelectListItem() { Text = x.Description, Value = x.Code, Selected = false, Disabled=false }).ToList();
                var template = new NewEmailTemplateViewModel() { IsNew=true };
                return View("NewOrModify", template);
            }
        }

        public ActionResult Edit(int id)
        {
            using(var db=new ApplicationDbContext())
            {
                var orgId = Convert.ToInt32((User as ClaimsPrincipal).Claims.Where(x => x.Type.Equals(IMSContants.OrgId)).Select(x => x.Value).Single());
                var template=db.Templates
                    .Include(x=>x.CreatedBy)
                    .Include(x=>x.TemplateType)
                    .Where(x => x.Id == id && x.OrgId==orgId).Single();
                var options = db.TemplateTypes.Where(x=>x.IsActive).Select(x => new SelectListItem() { Text = x.Description, Value = x.Code, Selected = x.Code.Equals(template.TemplateType.Code) , Disabled = false }).ToList();
                return View("NewOrModify",new NewEmailTemplateViewModel() {
                     Name=template.Name,
                     Id=template.Id,
                     Code = template.TemplateType.Code,
                     Content  = Encoding.UTF8.GetString(template.Content)
                });
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Update(NewEmailTemplateViewModel model)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext())
                {
                    var orgId= Convert.ToInt32((User as ClaimsPrincipal).Claims.Where(x => x.Type.Equals(IMSContants.OrgId)).Select(x => x.Value).Single());
                    var userid = User.Identity.GetUserId<int>();
                    var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)).Single();
                    var existing = db.Templates.Where(x => x.Id == model.Id && x.OrgId==orgId).Single();
                    existing.Content = Encoding.UTF8.GetBytes(model.Content);
                    existing.Name = model.Name;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            return View(model);
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ToggleIsActive(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var orgId = Convert.ToInt32((User as ClaimsPrincipal).Claims.Where(x => x.Type.Equals(IMSContants.OrgId)).Select(x => x.Value).Single());
                    var result = db.Templates.Where(x => x.Id == id && x.OrgId==orgId).Single();
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
        public ActionResult New(NewEmailTemplateViewModel model)
        {
            if (ModelState.IsValid)
            {
                try {

                    using (var db = new ApplicationDbContext())
                    {
                        var userid = User.Identity.GetUserId<int>();
                        var user = db.Users.Find(userid);
                        var org = db.Orgs.Find(user.OrgId);
                        var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)).Single();
                        var template = new Template
                        {
                            IsActive = true,
                            Name = model.Name,
                            Content = Encoding.UTF8.GetBytes(model.Content),
                            TemplateType = templateType,
                            Org = org,
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