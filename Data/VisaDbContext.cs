namespace visa_application_manager.Data
{

    using Microsoft.EntityFrameworkCore;
    using visa_application_manager.Models;

    public class VisaDbContext : DbContext
    {
        public VisaDbContext(DbContextOptions<VisaDbContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Country> Countries { get; set; }
    }
}