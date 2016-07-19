using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;

namespace IMS.ViewModels
{
    public class TemplateViewModel
    {
        public int? Id { get; set; }
        [Required]
        [AllowHtml]
        [Display(Name = "Template Content")]
        public string Content { get; set; }

        [Required]
        [Display(Name = "Template Type")]
        public string Description { get; set; }
       }
}