using Microsoft.EntityFrameworkCore;
using visa_application_manager.Models;

namespace visa_application_manager.Data
{
    public class VisaDbContext : DbContext
    {
        public VisaDbContext(DbContextOptions<VisaDbContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<Document> Documents { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>()
                .Property(c => c.VisaFee)
                .HasPrecision(10, 2); // Fix for decimal warning

            modelBuilder.Entity<Country>().HasData(
                new Country { Id = 1, Name = "USA", Requirements = "Passport, Photo", VisaFee = 160, ProcessingTimeInDays = 7, IsDeleted = false },
                new Country { Id = 2, Name = "Canada", Requirements = "Passport, Photo", VisaFee = 100, ProcessingTimeInDays = 10, IsDeleted = false }
            );

            modelBuilder.Entity<Application>()
    .Property(a => a.Status)
    .HasConversion<string>();


            modelBuilder.Entity<Application>().HasData(
                new Application
                {
                    Id = 1,
                    ApplicantName = "John Doe",
                    PassportNumber = "A1234567",
                    Email = "john@example.com",
                    PhoneNumber = "1234567890",
                    CountryId = 1,
                    Status = ApplicationStatus.Pending,
                    CreatedAt = new DateTime(2025, 7, 10), // use static date instead of DateTime.Now
                    IsDeleted = false,
                    IsPaid = false
                },
                new Application
                {
                    Id = 2,
                    ApplicantName = "Jane Smith",
                    PassportNumber = "B7654321",
                    Email = "jane@example.com",
                    PhoneNumber = "0987654321",
                    CountryId = 2,
                    Status = ApplicationStatus.Approved,
                    CreatedAt = new DateTime(2025, 7, 5), // also static
                    IsDeleted = false,
                    IsPaid = true
                }
            );

             modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Username = "superadmin",
                    Password = "supersecure", // 🔐 Hash in production
                    Role = AdminRole.SuperAdmin
                },
                new Admin
                {
                    Id = 2,
                    Username = "admin",
                    Password = "admin123",
                    Role = AdminRole.Admin
                }
            );


        }

    }
}
