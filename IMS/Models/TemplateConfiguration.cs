using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TemplateConfiguration: EntityTypeConfiguration<Template>
    {
        public TemplateConfiguration() {
            this.HasRequired(x => x.TemplateType).WithMany().HasForeignKey(x => x.TemplateTypeId).WillCascadeOnDelete(false);
        }
    }
}