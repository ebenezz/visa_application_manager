using System.ComponentModel.DataAnnotations;

namespace visa_application_manager.Models.DTOs
{
    public class AdminLoginDto
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}