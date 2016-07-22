using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class SupervisingCommentConfiguration : EntityTypeConfiguration<SupervisingComment>
    {
        public SupervisingCommentConfiguration() {
            this.HasRequired(x => x.Supervisor).WithMany().HasForeignKey(x => x.SupervisorId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Intern).WithMany().HasForeignKey(x => x.InternId).WillCascadeOnDelete(false);
        }
    }
}