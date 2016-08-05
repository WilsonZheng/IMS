using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.ViewModels
{
    public class AdjustExpiryViewModel
    {
        public int InternId { get; set; }
        public int Adjustment { get; set; }
        public bool IsExtension { get; set; }
    }
}