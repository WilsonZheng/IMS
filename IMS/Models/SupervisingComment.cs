namespace IMS.Models
{
    public class SupervisingComment
    {
        public int Id { get; set;}
        public int InternId { get; set; }
        public User Intern { get; set; }
        public int SupervisorId { get; set; }
        public User Supervisor { get; set; }
    }
}