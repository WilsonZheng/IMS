using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class ApplicantConfiguration:EntityTypeConfiguration<Applicant>
    {
        public ApplicantConfiguration()
        {

        }
    }
}