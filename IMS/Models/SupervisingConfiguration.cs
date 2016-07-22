using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class SupervisingConfiguration: EntityTypeConfiguration<Supervising>
    {
        public SupervisingConfiguration()
        {
            this.HasRequired(x => x.Supervisor).WithMany().HasForeignKey(x => x.SupervisorId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Intern).WithMany().HasForeignKey(x => x.InternId).WillCascadeOnDelete(false);
            this.HasKey(x => new { x.SupervisorId, x.InternId });
        }
    }
}