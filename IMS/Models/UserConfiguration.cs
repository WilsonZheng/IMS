using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            this.HasKey(x => x.Id).ToTable("IdentityUser");
            this.HasMany(x => x.Roles).WithRequired().HasForeignKey(x => x.UserId);
            this.HasMany(x => x.Claims).WithRequired().HasForeignKey(x => x.UserId);
        }
    }
}
