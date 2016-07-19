using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class ConfigurationConfiguration : EntityTypeConfiguration<Configuration>
    {
        public ConfigurationConfiguration()
        {
            this.HasRequired(x => x.ConfigurationType).WithMany().HasForeignKey(x => x.ConfigurationTypeId).WillCascadeOnDelete(false);
        }
    }
}