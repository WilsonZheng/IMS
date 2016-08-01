using System;

namespace IMS.Models
{
    public class TaskReport
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int InternshipId { get; set; }
        public Internship Internship { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
     }
}