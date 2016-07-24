using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public class Internship
    {
        public int Id { get; set; }
        public List<User> Supervisors { get; set; }
        public List<TaskToDo> Tasks { get; set; }
        public User Intern { get; set; }
        public DateTime CommenceAt { get; set; }
        public DateTime ExpiryAt { get; set; }
    }
}