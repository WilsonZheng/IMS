using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class InvitationViewModel
    {
        public int? Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}