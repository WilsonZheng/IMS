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
            //Database.SetInitializer<ApplicationDbContext>(null);//to use current db tables(faster)
            Database.SetInitializer<ApplicationDbContext>(new ApplicationDbInitializer());//to generate db tables automatically
        }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           
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
            modelBuilder.Configurations.Add(new InternshipConfiguration());
            modelBuilder.Configurations.Add(new TaskToDoConfiguration());
            modelBuilder.Configurations.Add(new InternTaskInvolvementConfiguration());
            modelBuilder.Configurations.Add(new TaskReportConfiguration());
            modelBuilder.Configurations.Add(new SupervisingCommentConfiguration());
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
        public DbSet<Internship> Internships { get; set; }
        public DbSet<InternTaskInvolvement> InternTaskInvolvements { get; set; }
        public DbSet<TaskToDo> TaskToDos { get; set; }
        public DbSet<TaskReport> TaskReports { get; set; }
        public DbSet<SupervisingComment> SupervisingComments { get; set; }

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
            roleManager.Create(new CustomRole("staff"));
            roleManager.Create(new CustomRole("intern"));
            const string password = "111111";

            userManager.Create(new User {
                UserName = "admin1@test.com",
                Email = "admin1@test.com",
                Org = org,
                FirstName="Adam",
                LastName="Sandler"
            }, password);
          

            User user;
            string email;
            string role;
            for(var i=0;i<10;i++)
            {
                role = "intern";
                email = string.Format("{1}{0}@test.com",i,role);
                userManager.Create(new User
                {
                    UserName = email,
                    Email = email,
                    Org = org,
                    FirstName=string.Format("Jhon{0}",i),
                    LastName= string.Format("Malcome{0}", i)
                }, password);
                user = userManager.FindByName(email);
                userManager.AddToRole(user.Id,role);
                context.Internships.Add(new Internship
                {
                    Id = user.Id,
                    CommenceAt = DateTime.Now.Date.ToUniversalTime(),
                    ExpiryAt = DateTime.Now.AddDays(90).Date.ToUniversalTime()
                });
            }

            for (var i = 0; i < 10; i++)
            {
                role = "staff";
                email = string.Format("{1}{0}@test.com", i, role);
                userManager.Create(new User
                {
                    UserName = email,
                    Email = email,
                    FirstName = string.Format("JhonStaff{0}", i),
                    LastName = string.Format("MalStaff{0}", i),
                    Org = org
                }, password);
                user = userManager.FindByName(email);
                userManager.AddToRole(user.Id, role);
            }
                        

            user = userManager.FindByName("admin1@test.com");
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