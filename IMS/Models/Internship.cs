﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Models
{
    public class Internship
    {
        public int Id { get; set; }
        public User Intern { get; set; }
    }
}