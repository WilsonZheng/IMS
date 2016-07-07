using IMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace IMS.Common
{
    public class OptionProvider:IOptionProvider
    {
        public List<SelectListItem> QueryOptions<T>() where T : Lookup
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Lookups.Where(x => x.IsActive)
                    .OfType<T>()
                    .Select(x => new SelectListItem { Text = x.Description, Value = x.Code.ToString() })
                    .OrderBy(x => x.Value).ToList();
            }
        }

      

        public List<SelectListItem> QueryOptions<T>(int code) where T : Lookup
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Lookups.Where(x => x.IsActive)
                    .OfType<T>()
                    .Select(x => new SelectListItem { Text = x.Description, Value = x.Code.ToString() ,Selected=(code==x.Code)})
                    .OrderBy(x => x.Value).ToList();
            }
        }
    }
}