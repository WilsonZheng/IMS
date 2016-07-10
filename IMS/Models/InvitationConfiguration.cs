using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class InvitationConfiguration: EntityTypeConfiguration<Invitation>
    {
        public InvitationConfiguration()
        {
            this.HasKey(x => new {x.TemplateId, x.Email });
            this.HasRequired(x => x.EmailTemplate).WithMany().HasForeignKey(x =>x.TemplateId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.RecruitStatusType).WithMany().HasForeignKey(x => x.RecruitStatusTypeId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.CreatedBy).WithMany().WillCascadeOnDelete(false);
            this.HasRequired(x => x.UpdatedBy).WithMany().WillCascadeOnDelete(false);
        }
    }
}