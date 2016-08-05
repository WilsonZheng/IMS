using System;
using System.Collections.Generic;

namespace IMS.ViewModels
{
    public class InternViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get {
                return FirstName + " " + LastName;
            } }
        public DateTime CommenceAt { get; set; }
        public DateTime ExpiryAt { get; set; }
        public double DaysToExpiry { get {
                return Math.Round((ExpiryAt - DateTime.UtcNow).TotalDays,1);
            } }
        public List<TaskToDoViewModel> TaskToDos { get; set; }
        public List<SupervisorViewModel> Supervisors { get; set; }
    }
}