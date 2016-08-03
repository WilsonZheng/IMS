using System.Collections.Generic;

namespace IMS.ViewModels
{
    public class AccountUserViewModel
    {
        public int Id { get; set; }
        public string FullName { get { return FirstName +" "+LastName; } }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public bool Locked { get; set; }
        public List<string> Roles { get; set; }

    }
}