using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class EmailTemplateContentViewModel
    {
        [Required]
        public string DefaultSubject { get; set; }
        [Required]
        public string DefaultContent { get; set; }
    }
}