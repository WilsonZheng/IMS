using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TaskConfiguration : EntityTypeConfiguration<TaskToDo>
    {
        public TaskConfiguration() {
            this.HasRequired(x => x.Owner).WithMany().HasForeignKey(x => x.OwnerId).WillCascadeOnDelete(false);
        }
    }
}