using Microsoft.AspNet.Identity.EntityFramework;

namespace IMS.Models
{
    public class CustomUserStore : UserStore<User, CustomRole, int,
       CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public CustomUserStore(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
