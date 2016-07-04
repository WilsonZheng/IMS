using System;

namespace IMS.Models
{
    public class Lookup
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public User UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}