using System.ComponentModel.DataAnnotations;

namespace visa_application_manager.Models
{
    public enum AdminRole
{
    SuperAdmin,
    Admin
}

    public class Admin
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = ""; 

        [Required]
        public string Password { get; set; } = ""; // Reminder: hash this in production!

        [Required]
        public AdminRole Role { get; set; } = AdminRole.Admin;
    }

}
