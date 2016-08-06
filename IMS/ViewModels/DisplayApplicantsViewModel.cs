using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class DisplayApplicantsViewModel
    {
        public string TemplateId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string VisaStatus { get; set; }
        public string MedicalCondition { get; set; }
    }
}