using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class RecruitStatusViewModel
    {
        public int Total { get; set; }
        public int Sent { get; set; }
        public int Received { get; set; }
        public int Approved { get; set; }
    }
}