using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class InternSearchConditionViewModel
    {
        public int? DaysToExpiry { get; set; }
        public int? DaysSinceExpiry { get; set; }
    }
}