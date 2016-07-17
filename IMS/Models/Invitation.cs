using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class Invitation
    {
        public int TemplateId{ get; set; }
        public Template EmailTemplate { get; set; }
        public string Email{ get; set; }
        public Applicant Applicant { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string InvitationCode { get; set; }
        public DateTime? SentAt { get; set; }
        public RecruitStatusType RecruitStatusType { get; set; }
        public int RecruitStatusTypeId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User UpdatedBy { get; set; }
        public int UpdatedById { get; set; }
        public User CreatedBy { get; set; }
        public int CreatedById { get; set; }
    }
}