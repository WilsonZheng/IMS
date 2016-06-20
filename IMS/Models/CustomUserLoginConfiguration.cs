using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class CustomUserLoginConfiguration : EntityTypeConfiguration<CustomUserLogin>
    {
        public CustomUserLoginConfiguration()
        {
            this.HasKey(x => new { x.LoginProvider, x.ProviderKey, x.UserId }).ToTable("IdentityUserLogin");
        }
    }
}
