namespace IMS.Models
{
    public class TaskToDo
    {
        public int Id { get; set; }
        public User Owner { get; set; }
        public int OwnerId { get; set; }
    }
}