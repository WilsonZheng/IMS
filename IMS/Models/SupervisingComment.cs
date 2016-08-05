using System;

namespace IMS.Models
{
    public class SupervisingComment
    {
        public int Id { get; set;}
        public int InternshipId { get; set; }
        public Internship Internship { get; set; }
        public int SupervisorId { get; set; }
        public User Supervisor { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
    }
}