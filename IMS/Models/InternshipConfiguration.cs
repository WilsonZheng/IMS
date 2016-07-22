using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class InternshipConfiguration : EntityTypeConfiguration<Internship>
    {
        public InternshipConfiguration() {
            this.HasRequired(x => x.Intern).WithOptional();
            this.HasKey(x => x.Id);
        }
    }
}