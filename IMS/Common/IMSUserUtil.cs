using IMS.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace IMS.Common
{
    public class IMSUserUtil
    {
        private IPrincipal _user;
        private ApplicationUserManager _manager;
        private IMS.Models.User _convertedUser;

        public IMSUserUtil(IPrincipal user, ApplicationUserManager manager)
        {
            this._user = user;
            this._manager = manager;
        }

        public bool IsInRole(string role) {
            return this._user.IsInRole(role);
        }

        public int Id
        {
            get
            {
                
                return _user.Identity.GetUserId<int>();
            }
        }

        public User DetachedUser{
            get {
                if (_convertedUser == null)
                {
                    _convertedUser = _manager.FindById(Id);
                }
                return _convertedUser;
            }
        }


        public User AttachedUser(ApplicationDbContext context)
        {
            return context.Users.Find(this.Id);
        }

        public int OrgId
        {
            get { return Convert.ToInt32((_user as ClaimsPrincipal).Claims.Where(x => x.Type.Equals(IMSContants.OrgId)).Select(x => x.Value).Single()); }
        }

    }
}