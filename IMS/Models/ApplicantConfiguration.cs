using System.Data.Entity.ModelConfiguration;

namespace IMS.Models
{
    public class ApplicantConfiguration:EntityTypeConfiguration<Applicant>
    {
        public ApplicantConfiguration()
        {
            this.HasKey(x => x.Id);
            this.HasRequired(x => x.Org).WithMany().HasForeignKey(x=>x.OrgId).WillCascadeOnDelete(false);
            this.HasOptional(x => x.User).WithMany().WillCascadeOnDelete(false);
            this.HasRequired(x => x.UpdatedBy).WithMany().WillCascadeOnDelete(false);
            this.HasRequired(x => x.CreatedBy).WithMany().WillCascadeOnDelete(false);
            this.HasRequired(x => x.RecruitStatusType).WithMany().HasForeignKey(x => x.RecruitStatusTypeId).WillCascadeOnDelete(false);
        }
    }
}