using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class LookupConfiguration : EntityTypeConfiguration<Lookup>
    {
        public LookupConfiguration() {
            this.HasKey(x => x.Id);
            this.Property(x => x.Description).IsRequired();
            this.Property(x => x.Code).IsRequired();
            this.Map<RecruitStatusType>(x => x.Requires("EntityType").HasValue("RecruitStatusType"));
        }
    }
}