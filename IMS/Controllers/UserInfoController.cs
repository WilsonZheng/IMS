using IMS.Common;
using IMS.Models;
using IMS.ViewModels;
using Microsoft.AspNet.Identity.Owin;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using System;

namespace IMS.Controllers
{
    [Authorize]
    public class UserInfoController : Controller
    {

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
        
        [HttpPost]
        public ActionResult GetUser()
        {
            try
            {
                using (var db = new ApplicationDbContext())
                {
                    var user = IMSUserUtil.AttachedUser(db);
                    var result = new UserViewModel {
                         Id=user.Id,
                         UserName=user.UserName,
                         Roles= user.Roles.Join(db.Roles,
                                         userrole => userrole.RoleId,
                                         role => role.Id, 
                                         (userrole, role) => role.Name)
                                         .ToArray<string>()
                };
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new ImsResult { Error = e.Message });
            }
        }


    }
}