using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public class TaskToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public User Owner { get; set; }
        public List<Internship> Participants { get; set; }
        public int OwnerId { get; set; }
        public bool IsClosed { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}