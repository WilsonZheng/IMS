using System;

namespace IMS.ViewModels
{
    public class TaskInvolvemenViewModel
    {
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int SuperVisorId { get; set; }
        public string SupervisorName { get; set; }
        public DateTime JoinAt { get; set; }
        public DateTime? LeftAt { get; set; }
        public DateTime? TaskClosedAt { get; set; }
        public bool IsClosed { get; set; }
    }
}