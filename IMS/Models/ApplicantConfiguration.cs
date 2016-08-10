using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class ApplicantConfiguration:EntityTypeConfiguration<Applicant>
    {
        public ApplicantConfiguration()
        {
            this.HasKey(x => new { x.TemplateId, x.Email });
            this.HasRequired(x => x.Program).WithMany().HasForeignKey(x => x.TemplateId).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Invitation).WithOptional(x => x.Applicant).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Org).WithMany().HasForeignKey(x=>x.OrgId).WillCascadeOnDelete(false);
            this.HasOptional(x => x.User).WithMany().WillCascadeOnDelete(false);
           
        }
    }
}