using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class TaskAssignment
    {
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public int InternId { get; set; }
        public User Intern { get; set; }
    }
}