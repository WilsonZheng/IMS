using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class InternshipConfiguration : EntityTypeConfiguration<Internship>
    {
        public InternshipConfiguration() {
            this.HasRequired(x => x.Intern).WithOptional();
            this.HasMany(x => x.Tasks).WithMany(x=>x.Participants)
            .Map(m =>
             {
                 m.ToTable("InternshipTask");
                 m.MapLeftKey("InternshipId");
                 m.MapRightKey("TaskId");
             });
             this.HasMany(x => x.Supervisors).WithMany(x=>x.Internships)
                 .Map(m =>
                 {
                     m.ToTable("InternshipSupervisor");
                     m.MapLeftKey("InternshipId");
                     m.MapRightKey("SupervisorId");
                 });
        }
    }
}