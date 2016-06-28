﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Models
{
    public class NewEmailTemplateViewModel
    {
        public int Id { get; set; }
        [Required]
        [Display(Name = "name")]
        public string Name { get; set; }

        [Required]
        [AllowHtml]
        [Display(Name = "Template")]
        public string Content { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }

    }
}