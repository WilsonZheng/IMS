using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IMS.Common
{
    public interface IEmailProvider
    {
        void Send(string title,string receiver, string body,string id,string password);
    }
}