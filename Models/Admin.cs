using System.ComponentModel.DataAnnotations;

namespace visa_application_manager.Models
{
    public class Admin
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        public string Password { get; set; } = ""; // For simplicity, storing plain text — not secure for production.
    }
}
