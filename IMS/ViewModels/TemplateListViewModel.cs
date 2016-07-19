using System;

namespace IMS.ViewModels
{
    public class TemplateListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public RecruitStatusViewModel RecruitStatus { get; set; }
    }
}