using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class InternTaskInvolvementConfiguration : EntityTypeConfiguration<InternTaskInvolvement>
    {
        public InternTaskInvolvementConfiguration() {
            this.HasRequired(x => x.Intern).WithMany().HasForeignKey(x => x.InternId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Task).WithMany().HasForeignKey(x => x.TaskId).WillCascadeOnDelete(false);
        }
    }
}