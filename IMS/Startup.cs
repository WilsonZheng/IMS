using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IMS.Startup))]
namespace IMS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
