using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class InvitationViewModel
    {
        public int? TemplateId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}