using System;

namespace IMS.Models
{
    public class Template
    {
        public int Id { get; set; }
        public String name { get; set; }
        public TemplateType TemplateType { get; set; }
        public int TemplateTypeId { get; set; }
        public byte[] Content { get; set;}
    }
}