using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;

namespace IMS.Common
{
    public static class IMSEnvProperties
    {
        private static string _gmailAppPassword;
        public static string GmailAppPassword
        {   get
            { return _gmailAppPassword??""; }
            private set { _gmailAppPassword = value; }
        }

        private static string _gmailAccount;
        public static string GmailAccount
        {
            get
            { return _gmailAccount ?? ""; }
            private set { _gmailAccount = value; }
        }

        private static string _contractEndPoint;
        public static string ContractEndPoint
        {
            get
            { return _contractEndPoint ?? ""; }
            private set { _contractEndPoint = value; }
        }

        static IMSEnvProperties() {
           
            using (var stream = new StreamReader(ConfigurationManager.AppSettings["ims-properties"]))
            {
                dynamic result = JsonConvert.DeserializeObject(Convert.ToString(stream.ReadToEnd()));
                GmailAppPassword    = result.GmailAppPassword;
                GmailAccount        = result.GmailAccount;

                ContractEndPoint    = result.ContractEndPoint;
            }
           
        }
    }
}