using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class Configuration
    {
        public int Id { get; set; }
        public ConfigurationType ConfigurationType { get; set; }
        public int ConfigurationTypeId { get; set; }
        public string Config { get; set; }
    }
}