using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TaskAssignmentHistoryConfiguration : EntityTypeConfiguration<TaskAssignmentHistory>
    {
        public TaskAssignmentHistoryConfiguration() {
            this.HasRequired(x => x.Internship).WithMany().HasForeignKey(x => x.InternshipId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Task).WithMany().HasForeignKey(x => x.TaskId).WillCascadeOnDelete(false);
        }
    }
}