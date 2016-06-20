using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class CustomRoleConfiguration : EntityTypeConfiguration<CustomRole>
    {
        public CustomRoleConfiguration()
        {
            this.HasKey(x => x.Id).ToTable("IdentityRole");
            this.HasMany(x => x.Users).WithRequired().HasForeignKey(x => x.RoleId);
        }
    }
}
