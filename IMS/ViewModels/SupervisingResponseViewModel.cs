using System.Collections.Generic;

namespace IMS.ViewModels
{
    public class SupervisingResponseViewModel
    {
        public int InternId { get; set; }
        public int SupervisorId { get; set; }
        public List<InternViewModel> Interns{get;set;}
        public List<SupervisorViewModel> Supervisors { get; set; }
    }
}