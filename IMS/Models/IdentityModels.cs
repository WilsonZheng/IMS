using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

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



            modelBuilder.Configurations.Add(new CustomUserRoleConfiguration());
           modelBuilder.Configurations.Add(new CustomUserClaimConfiguration());
            modelBuilder.Configurations.Add(new CustomUserLoginConfiguration());
           modelBuilder.Configurations.Add(new CustomRoleConfiguration());
        }

        public DbSet<Applicant> Applicants { get; set; }
        public  DbSet<Recruitment> Recruitements { get; set; }

    }
    
    public class ApplicationDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
             
       
    }

}