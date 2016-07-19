using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class InvitationViewModel
    {
        public int NoticeId { get; set; }
        public string NoticeName { get; set; }
        public string Email { get; set; }
        public int RecruitStatusCode { get; set; }
    }
}