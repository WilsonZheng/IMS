using IMS.Models;
using System.Linq;
using System.Text;
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
            return View(new NewEmailTemplateViewModel());
        }

        public ActionResult EditEmail(int id)
        {
            using(var db=new ApplicationDbContext())
            {
                var template=db.Templates.Where(x => x.Id == id).Single();
                return View(new NewEmailTemplateViewModel() {
                     Name=template.Name,
                     Id=template.Id,
                     Code = template.TemplateType.Code,
                     Content  = Encoding.UTF8.GetString(template.Content)
                });
            }
        }

        [HttpPost]
        public ActionResult NewEmail(NewEmailTemplateViewModel model)
        {
            if (ModelState.IsValid)
            {
                using(var db=new ApplicationDbContext())
                {
                    var templateType = db.TemplateTypes.Where(x => x.Code.Equals(model.Code)).Single();
                    var template = new Template
                    {
                        Name = model.Name,
                        Content = Encoding.UTF8.GetBytes(model.Content),
                        TemplateType=templateType
                    };
                    db.Templates.Add(template);
                    db.SaveChanges();
                    return RedirectToAction("Email");
                }
            }
            //ModelState.AddModelError("","dkdkdkdk" );
            return View(model);
        }


        public ActionResult ContractTemp() {
            return View();
        }



       


      

    }
}