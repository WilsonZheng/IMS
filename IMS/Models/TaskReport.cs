namespace IMS.Models
{
    public class TaskReport
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public TaskToDo Task { get; set; }
        public int InternshipId { get; set; }
        public Internship Internship { get; set; }
     }
}