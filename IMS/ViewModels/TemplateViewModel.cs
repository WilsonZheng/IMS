using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;

namespace IMS.ViewModels
{
    public class TemplateViewModel
    {
       
        static TemplateViewModel() {
            using(var db=new IMS.Models.ApplicationDbContext())
            {
                _TemplateTypeOptions = db.TemplateTypes.Where(x=>x.IsActive).Select(x => new SelectListItem() { Text = x.Description, Value = x.Code.ToString(), Selected =false,Disabled=false}).ToList();
            }
        }
        
        public int? Id { get; set; }
    
        [Required]
        [AllowHtml]
        [Display(Name = "Template Content")]
        public string Content { get; set; }

        [Required]
        [Display(Name = "Template Type")]
        public int Code { get; set; }

        private static List<SelectListItem> _TemplateTypeOptions;
        
        public List<SelectListItem> TemplateTypeOptions {
            get {
                List<SelectListItem> options = new List<SelectListItem>();
                foreach (var item in _TemplateTypeOptions) {
                    options.Add(new SelectListItem {
                        Text =item.Text,
                        Value =item.Value,
                        Disabled =item.Disabled,
                        Selected =item.Value.Equals(this.Code.ToString())});
                }
                return options; }
            }
       }
}