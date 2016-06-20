using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Models
{
    public class CustomUserRoleConfiguration : EntityTypeConfiguration<CustomUserRole>
    {
        public CustomUserRoleConfiguration()
        {
            this.HasKey(x => new { x.UserId, x.RoleId }).ToTable("IdentityUserRole");
        }
    }
}
