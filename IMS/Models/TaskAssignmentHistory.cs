using System;

namespace IMS.Models
{
    public class TaskAssignmentHistory
    {
        public int Id { get; set; }
        public int InternId { get; set; }
        public User Intern { get; set; }
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public DateTimeOffset JoinedAt{get;set;}
        public DateTimeOffset LeftAt { get; set; }
    }
}