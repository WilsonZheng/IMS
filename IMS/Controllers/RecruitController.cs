
using IMS.Common;
using IMS.Media;
using IMS.Models;
using IMS.ViewModels;
using LinqKit;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Newtonsoft.Json;

namespace IMS.Controllers
{
    [Authorize(Roles ="admin")]
    public class RecruitController : Controller
    {
        private IOptionProvider _optionProvider;
        private IOptionProvider OptionProvider { get { return this._optionProvider; } }
        private IEmailProvider _emailProvier;
        private IEmailProvider EmailProvider { get { return this._emailProvier; } }

        public RecruitController() { }

        public RecruitController(IOptionProvider optionProvider,IEmailProvider emailProvider)
        {
            _optionProvider = optionProvider;
            _emailProvier   = emailProvider;
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
        public ActionResult Index(RecruitStatusCode? code)
        {
            var model = new RecruitIndexViewModel
            {
                //RecruitStatusOptions = OptionProvider.QueryOptions<RecruitStatusType>(code.HasValue && (code >= RecruitStatusCode.InvitationCreated && code <= RecruitStatusCode.Approved)? (int)code:(int)RecruitStatusCode.InvitationCreated)
            };
            return View(model);
            
        }
        
        //public ActionResult List(InvitationSearchViewModel model)
        //{
        //    using(var db=new ApplicationDbContext())
        //    {
        //        var predicate = PredicateBuilder.True<Invitation>().And(p => p.EmailTemplate.OrgId == IMSUserUtil.OrgId);
        //        predicate = predicate.And(model.RecruitStatusTypeIdsPredicate);
        //        var result = db.Invitations.AsExpandable().Where(predicate).OrderByDescending(x=>x.CreatedAt)
        //            .Select(x=> new InvitationViewModel { TemplateId=x.TemplateId,Email=x.Email})
        //            .ToList();
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //}
  
      
    }
}