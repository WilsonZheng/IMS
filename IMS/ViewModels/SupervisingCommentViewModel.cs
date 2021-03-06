﻿using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.ViewModels
{
    public class SupervisingCommentViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public string SupervisorName { get; set; }
        public int SupervisorId { get; set; }
        public int InternshipId { get; set; }
    }
}