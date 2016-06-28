using IMS.Models;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Data.Entity;

namespace IMS.Controllers
{
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
                var result = db.Templates.Include(x => x.TemplateType).Where(x => x.IsActive).OrderByDescending(x => x.Id).ToList();
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
                var template=db.Templates.Include(x=>x.TemplateType).Where(x => x.Id == id).Single();
                var options = db.TemplateTypes.Select(x => new SelectListItem() { Text = x.Description, Value = x.Code, Selected = x.Code.Equals(template.TemplateType.Code) , Disabled = false }).ToList();
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
                    var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)).Single();
                    var existing = db.Templates.Where(x => x.Id == model.Id).Single();
                    existing.Content = Encoding.UTF8.GetBytes(model.Content);
                    existing.Name = model.Name;
                    existing.TemplateTypeId = templateType.Id;
                    existing.TemplateType = templateType;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            //ModelState.AddModelError("","dkdkdkdk" );
            return View(model);
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Delete(int id)
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var result = db.Templates.Where(x => x.Id == id).Single();
                    result.IsActive = false;
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
                using(var db=new ApplicationDbContext())
                {
                    var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)).Single();
                    var template = new Template
                    {
                        IsActive=true,
                        Name = model.Name,
                        Content = Encoding.UTF8.GetBytes(model.Content),
                        TemplateType=templateType
                    };
                    db.Templates.Add(template);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            //ModelState.AddModelError("","dkdkdkdk" );
            return View("NewOrModify",model);
        }


        public ActionResult ContractTemp() {
            return View();
        }



       


      

    }
}