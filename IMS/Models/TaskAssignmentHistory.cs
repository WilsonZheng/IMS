using System;

namespace IMS.Models
{
    public class TaskAssignmentHistory
    {
        public int Id { get; set; }
        public int InternshipId { get; set; }
        public Internship Internship { get; set; }
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public DateTimeOffset JoinedAt{get;set;}
        public DateTimeOffset LeftAt { get; set; }
    }
}