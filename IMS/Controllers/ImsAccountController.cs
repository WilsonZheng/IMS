using IMS.Common;
using IMS.Models;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Linq;
using IMS.ViewModels;

namespace IMS.Controllers
{
    public class ImsAccountController : Controller
    {
        private ApplicationUserManager _userManager;


        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
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


        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> ReleaseLock(int userId)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(userId);
                var result = await UserManager.SetLockoutEndDateAsync(user.Id, DateTimeOffset.UtcNow.AddDays(-1));
                return Json(new IMS.Common.ImsResult { });
            }

            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Lock(int userId)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(userId);
                var result = await UserManager.SetLockoutEndDateAsync(user.Id, DateTimeOffset.UtcNow.AddDays(365*10));
                return Json(new IMS.Common.ImsResult { });
            }

            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }
        }

        // GET: Admin
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult> ResetPassword(int userId)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(userId);
                //Granted the control over those in the same organization only.
                if (user.OrgId != IMSUserUtil.OrgId) throw new Exception("Unauthorized access!");
                //Reset password to '111111' user needs to log in and change it immediately.
                var result = await UserManager.ResetPasswordAsync(user.Id,
                    await UserManager.GeneratePasswordResetTokenAsync(user.Id), "111111");
                if (!result.Succeeded) throw new Exception("Resetting password failed.");
                return Json(new IMS.Common.ImsResult { });
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }

        }
        
        // GET: Admin
        [Authorize(Roles = "admin")]
        [HttpPost]
        public ActionResult GetUsers()
        {
            try
            {
                using(var db=new ApplicationDbContext())
                {
                    var roles = db.Roles.ToList();
                    var result=db.Users.Where(x => x.OrgId == IMSUserUtil.OrgId)
                        .Include(x=>x.Roles).ToList()
                        .Select(x => new AccountUserViewModel {
                         Id=x.Id,
                         FirstName=x.FirstName,
                         LastName=x.LastName,
                         UserName=x.UserName,
                         Locked=x.LockoutEnabled&&x.LockoutEndDateUtc.HasValue&& x.LockoutEndDateUtc >DateTime.UtcNow,
                         Roles= x.Roles.Join(roles,or=>or.RoleId,r=>r.Id,(or,r)=>r.Name).ToList()
                    });
                    return Json(new ImsResult { Data = result });
                }
            }
            catch (Exception e)
            {
                return Json(new IMS.Common.ImsResult { Error = e.Message });
            }

        }

    }
}