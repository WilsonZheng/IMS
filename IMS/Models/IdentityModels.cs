using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System;
using IMS.Common;

namespace IMS.Models
{

    public class ApplicationDbContext : IdentityDbContext<User, CustomRole, int, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }


        static ApplicationDbContext()
        {
            // Set the database intializer which is run once during application start
            // This seeds the database with admin user credentials and admin role
            Database.SetInitializer<ApplicationDbContext>(null);//to use current db tables(faster)
            //Database.SetInitializer<ApplicationDbContext>(new ApplicationDbInitializer());//to generate db tables automatically
        }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new ApplicantConfiguration());
            modelBuilder.Configurations.Add(new UserConfiguration());

            modelBuilder.Configurations.Add(new OrgConfiguration());
            modelBuilder.Configurations.Add(new LookupConfiguration());
            modelBuilder.Configurations.Add(new TemplateConfiguration());

            modelBuilder.Configurations.Add(new CustomUserRoleConfiguration());
            modelBuilder.Configurations.Add(new CustomUserClaimConfiguration());
            modelBuilder.Configurations.Add(new CustomUserLoginConfiguration());
            modelBuilder.Configurations.Add(new CustomRoleConfiguration());
            modelBuilder.Configurations.Add(new ConfigurationConfiguration());
            modelBuilder.Configurations.Add(new InvitationConfiguration());
        }

        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Org> Orgs { get; set; }
        public DbSet<Lookup> Lookups { get; set; }
        public DbSet<RecruitStatusType> RecruitStatusType { get; set;}
        public DbSet<TemplateType> TemplateTypes { get; set; }
        public DbSet<ConfigurationType> ConfigurationTypes { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Configuration> Configurations { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
    }
    
    public class ApplicationDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            var org = new Org { Name = "CSS", IsActive = true };
            context.Orgs.Add(org);
            
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();
            roleManager.Create(new CustomRole("admin"));
            roleManager.Create(new CustomRole("leader"));
            const string password = "111111";

            userManager.Create(new User {
                UserName = "admin@test.com",
                Email = "admin@test.com",
                Org = org
            }, password);
            userManager.Create(new User
            {
                UserName = "leader@test.com",
                Email = "leader@test.com",
                Org = org
            }, password);

            userManager.Create(new User
            {
                UserName = "intern@test.com",
                Email = "intern@test.com",
                Org = org
            });
            
            var user = userManager.FindByName("leader@test.com");
            userManager.AddToRole(user.Id, "leader");

            user = userManager.FindByName("admin@test.com");
            userManager.AddToRole(user.Id,"admin");

            context.ConfigurationTypes.Add(new ConfigurationType { Code = (int)ConfigurationTypeCode.Smtp, Description = "Smtp", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });                   
            context.RecruitStatusType.Add(new RecruitStatusType { Code = (int)RecruitStatusCode.InvitationSent,Description="Sent", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });
            context.RecruitStatusType.Add(new RecruitStatusType { Code = (int)RecruitStatusCode.ContractReceived,Description="Replied", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });
            context.RecruitStatusType.Add(new RecruitStatusType { Code = (int)RecruitStatusCode.Approved,Description="Approved", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });
            context.TemplateTypes.Add(new TemplateType { Code =(int)TemplateTypeCode.Email, Description = "Email", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });
            context.TemplateTypes.Add(new TemplateType { Code =(int)TemplateTypeCode.Contract, Description = "Contract", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, IsActive = true });
        }
    }

}