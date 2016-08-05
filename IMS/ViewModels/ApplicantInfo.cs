using IMS.Models;
using iTextSharp.text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class ApplicantInfo
    {
        public int TemplateId { get; set; }
        public Invitation Invitation { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Kiwiname { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string Suburb { get; set; }
        public string VisaStatus { get; set; }
        public string MedicalCondition { get; set; }

        public string SignImgData { get; set; }

        public byte[] SignBinData { get; set; }
        public string InvitationCode { get; set; }
        public string PassportFileLocation { get; set; }
        public string SignPath { get; set; }
    }
}