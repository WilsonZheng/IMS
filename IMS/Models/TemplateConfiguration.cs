using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class TemplateConfiguration: EntityTypeConfiguration<Template>
    {
        public TemplateConfiguration() {
            this.HasKey(x => x.Id);
            this.HasRequired(x => x.TemplateType).WithMany().HasForeignKey(x => x.TemplateTypeId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.CreatedBy).WithMany().HasForeignKey(x => x.CreatedById).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Org).WithMany().HasForeignKey(x => x.OrgId).WillCascadeOnDelete(false);
            this.Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}