using Microsoft.EntityFrameworkCore;
using visa_application_manager.Models;

namespace visa_application_manager.Data
{
    public class VisaDbContext : DbContext
    {
        public VisaDbContext(DbContextOptions<VisaDbContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<Country>().HasData(
                new Country
                {
                    Id = 1,
                    Name = "USA",
                    Requirements = "Passport, Photo",
                    VisaFee = 160,
                    ProcessingTimeInDays = 7,
                    IsDeleted = false
                },
                new Country
                {
                    Id = 2,
                    Name = "Canada",
                    Requirements = "Passport, Photo",
                    VisaFee = 100,
                    ProcessingTimeInDays = 10,
                    IsDeleted = false
                }
            );

            _ = modelBuilder.Entity<Application>().HasData(
                new Application
                {
                    Id = 1,
                    ApplicantName = "John Doe",
                    PassportNumber = "A1234567",
                    Email = "john@example.com",
                    PhoneNumber = "1234567890",
                    CountryId = 1,
                    Status = "Pending",
                   CreatedAt = new DateTime(2024, 1, 10),
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
                    Status = "Approved",
                    CreatedAt = new DateTime(2024, 1, 5),
                    IsDeleted = false,
                    IsPaid = true
                }
            );
        }
    }
}
