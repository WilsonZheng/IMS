using System;

namespace IMS.Models
{
    public class Applicant
    {
        public int TemplateId { get; set; }
        public Template Program { get; set; }
        public string Email { get; set; }
        public Invitation Invitation { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string VisaStatus { get; set;}
        public string MedicalCondition { get; set; }
        public string Company { get; set; }
        public DateTime? ApplicationDt { get; set; }
        public Org Org { get; set; }
        public int OrgId { get; set;}
        public User User { get; set; }
        public User UpdatedBy { get; set; }
        public int UpdatedById { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}