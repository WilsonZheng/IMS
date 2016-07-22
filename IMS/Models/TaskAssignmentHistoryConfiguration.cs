using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class TaskAssignmentHistoryConfiguration : EntityTypeConfiguration<TaskAssignmentHistory>
    {
        public TaskAssignmentHistoryConfiguration() {
            this.HasRequired(x => x.Intern).WithMany().HasForeignKey(x => x.InternId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Task).WithMany().HasForeignKey(x => x.TaskId).WillCascadeOnDelete(false);
        }
    }
}