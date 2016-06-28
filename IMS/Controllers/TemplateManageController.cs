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


        public ActionResult Contract() {
            return View();
        }



       


      

    }
}