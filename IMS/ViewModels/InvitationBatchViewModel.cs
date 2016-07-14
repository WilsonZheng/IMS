using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class InvitationBatchViewModel
    {
        [Required]
        public int NoticeId { get; set; }
        [Required]
        public string[] Emails { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
    }
}