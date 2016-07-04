﻿using IMS.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace IMS.Common
{
    public interface IOptionProvider
    {
       List<SelectListItem> QueryOptions<T>() where T : Lookup;
    }
}