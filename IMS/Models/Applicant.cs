using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class Applicant
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string VisaStatus { get; set; }
        public string MedicalCondition { get; set; }
        public string Company { get; set; }
        public string InvitationCode { get; set; }
        public int SignatureId { get; set; }
        public int MediaId { get; set; }
    }
}