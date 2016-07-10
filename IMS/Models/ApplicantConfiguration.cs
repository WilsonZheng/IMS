using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class ApplicantConfiguration:EntityTypeConfiguration<Applicant>
    {
        public ApplicantConfiguration()
        {
            this.HasKey(x => x.Id);
            this.HasRequired(x => x.Invitation).WithOptional(x=>x.Applicant).WillCascadeOnDelete(false);
            this.HasRequired(x => x.Org).WithMany().HasForeignKey(x=>x.OrgId).WillCascadeOnDelete(false);
            this.HasOptional(x => x.User).WithMany().WillCascadeOnDelete(false);
            this.HasRequired(x => x.UpdatedBy).WithMany().HasForeignKey(x => x.UpdatedById).WillCascadeOnDelete(false);
            this.HasRequired(x => x.CreatedBy).WithMany().HasForeignKey(x=>x.CreatedById).WillCascadeOnDelete(false);
        }
    }
}