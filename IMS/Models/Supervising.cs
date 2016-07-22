using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class Supervising
    {
        public int SupervisorId { get; set; }
        public User Supervisor { get; set; }
        public int InternId { get; set; }
        public User Intern { get; set; }
    }
}