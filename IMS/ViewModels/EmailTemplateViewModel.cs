using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class EmailTemplateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public InvitationTemplateContentViewModel Content { get; set; }
    }
}