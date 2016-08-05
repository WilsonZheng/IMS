using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TaskToDoConfiguration : EntityTypeConfiguration<TaskToDo>
    {
        public TaskToDoConfiguration() {
            this.HasRequired(x => x.Owner).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }
    }
}