using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class EmailTemplateViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public EmailTemplateContentViewModel Content { get; set; }
        public RecruitStatusViewModel RecruitStatus { get; set; }
    }
}