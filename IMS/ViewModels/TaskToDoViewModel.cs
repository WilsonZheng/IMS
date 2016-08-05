using System.Collections.Generic;

namespace IMS.ViewModels
{
    public class TaskToDoViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<InternViewModel> Participants { get; set; }
        public int SupervisorId { get; set; }
        public string SupervisorName { get; set; }
        public bool IsClosed { get; set; }
    }
}