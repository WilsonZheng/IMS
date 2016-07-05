using System.Net;
using System.Net.Mail;

namespace IMS.Common
{
    public class ImsGmailProvider : IEmailProvider
    {
        void IEmailProvider.Send(string subject, string receiver, string body, string sender, string password)
        {
            using (MailMessage mm = new MailMessage(sender, receiver))
            {
                mm.Subject = subject;
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential(sender,password);
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);
            }
            
        }
    }
}