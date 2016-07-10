using System;

namespace IMS.Models
{
    public class Template
    {
        public int Id { get; set; }
        public int OrgId { get; set; }
        public int TemplateTypeId { get; set; }
        public TemplateType TemplateType { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public byte[] Content { get; set;}
        public Org Org { get; set; }
        public User CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set;}
    }
}