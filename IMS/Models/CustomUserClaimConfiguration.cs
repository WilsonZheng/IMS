using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class CustomUserClaimConfiguration : EntityTypeConfiguration<CustomUserClaim>
    {
        public CustomUserClaimConfiguration()
        {
            this.HasKey(x => x.Id).ToTable("IdentityUserClaim");
        }

    }
}
