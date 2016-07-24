using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.ComponentModel.DataAnnotations;
using IMS.Common;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class User : IdentityUser<int, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Org Org { get; set; }
        public int OrgId { get; set;}
       
        public List<Internship> Internships { get; set; }


        [Timestamp]
        public byte[] RowVersion { get; set; }
              
    
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User, int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            //OrgId
            userIdentity.AddClaim(new Claim(IMSContants.OrgId,Convert.ToString(this.OrgId)));
            return userIdentity;
        }

}
}
