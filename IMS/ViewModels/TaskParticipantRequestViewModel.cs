using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class TaskParticipantRequestViewModel
    {
        public int TaskId { get; set; }
        public int ParticipantId { get; set; }
        public bool IsJoining { get; set; }
    }
}