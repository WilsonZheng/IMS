using System;

namespace IMS.Models
{
    public class InternTaskInvolvement
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public int InternId { get; set; }
        public User Intern { get; set; }
        public bool IsActive { get; set; } 
        public DateTime  JoinAt { get; set; }
        public DateTime? LeftAt { get; set; }
    }
}