using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TaskAssignmentConfiguration : EntityTypeConfiguration<TaskAssignment>
    {
        public TaskAssignmentConfiguration() {
            this.HasRequired(x => x.Task).WithMany().HasForeignKey(x => x.TaskId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Intern).WithMany().HasForeignKey(x => x.InternId).WillCascadeOnDelete(false);
            this.HasKey(x => new { x.TaskId, x.InternId });
        }
    }
}