using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System;

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
            modelBuilder.Configurations.Add(new RecruitmentConfiguration());
            modelBuilder.Configurations.Add(new UserConfiguration());

            modelBuilder.Configurations.Add(new OrgConfiguration());
            modelBuilder.Configurations.Add(new LookupConfiguration());

            modelBuilder.Configurations.Add(new CustomUserRoleConfiguration());
            modelBuilder.Configurations.Add(new CustomUserClaimConfiguration());
            modelBuilder.Configurations.Add(new CustomUserLoginConfiguration());
            modelBuilder.Configurations.Add(new CustomRoleConfiguration());
        }

        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Recruitment> Recruitements { get; set; }
        public DbSet<Org> Orgs { get; set; }
        public DbSet<RecruitStatusType> RecruitStatusType { get; set;}

    }
    
    public class ApplicationDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            var org = new Org { Name = "CSS", IsActive = true };
            context.Orgs.Add(org);


            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();
            const string name = "admin@test.com";
            const string password = "111111";
            const string roleName = "admin";

            //Create Role admin if it does not exist
            var role = roleManager.FindByName(roleName);
            if (role == null)
            {
                role = new CustomRole(roleName);
                var roleresult = roleManager.Create(role);
            }

            var user = userManager.FindByName(name);
            if (user == null)
            {
                user = new User
                {
                    UserName = name,
                    Email = name,
                    Org=org
                };
                var result = userManager.Create(user, password);
                result = userManager.SetLockoutEnabled(user.Id, false);
            }
            // Add user admin to Role Admin if not already added
            var rolesForUser = userManager.GetRoles(user.Id);
            if (!rolesForUser.Contains(role.Name))
            {
                var result = userManager.AddToRole(user.Id, role.Name);
            }
            context.RecruitStatusType.Add(new RecruitStatusType { Code = "0", Description = "Invitation draft",CreatedBy=user,UpdatedBy=user,CreatedAt=DateTime.UtcNow,UpdatedAt=DateTime.UtcNow });
            context.RecruitStatusType.Add(new RecruitStatusType { Code = "1", Description = "Invitation sent", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });
            context.RecruitStatusType.Add(new RecruitStatusType { Code = "2", Description = "contract received", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });
            context.RecruitStatusType.Add(new RecruitStatusType { Code = "3", Description = "application accepted", CreatedBy = user, UpdatedBy = user, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });

        }
    }

}