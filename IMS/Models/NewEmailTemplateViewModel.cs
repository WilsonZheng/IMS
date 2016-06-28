using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Models
{
    public class NewEmailTemplateViewModel
    {
        public NewEmailTemplateViewModel() {
            IsNew = false;
        }
        static NewEmailTemplateViewModel() {
            using(var db=new ApplicationDbContext())
            {
                _TemplateTypeOptions = db.TemplateTypes.Select(x => new SelectListItem() { Text = x.Description, Value = x.Code, Selected =false,Disabled=false}).ToList();
            }
        }

        public bool IsNew { get; set; }

        public int Id { get; set; }
        [Required]
        [Display(Name = "Title")]
        public string Name { get; set; }

        [Required]
        [AllowHtml]
        [Display(Name = "Template Content")]
        public string Content { get; set; }

        [Required]
        [Display(Name = "Template Type")]
        public string Code { get; set; }

        private static List<SelectListItem> _TemplateTypeOptions;
        
        public List<SelectListItem> TemplateTypeOptions {
            get {
                List<SelectListItem> options = new List<SelectListItem>();
                foreach (var item in _TemplateTypeOptions) {
                    options.Add(new SelectListItem {
                        Text =item.Text,
                        Value =item.Value,
                        Disabled =item.Disabled,
                        Selected =item.Value.Equals(this.Code) });
                }
                return options; }
            }
       }
}