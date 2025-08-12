using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace visa_application_manager.Models
{
    public enum ApplicationStatus
    {
        Pending,
        UnderReview,
        Approved,
        Rejected
    }

    public class Application
    {
        public int Id { get; set; }

        [Required]
        public string ApplicantName { get; set; } = "";

        [Required]
        public string PassportNumber { get; set; } = "";

        [Required, EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string PhoneNumber { get; set; } = "";

        public int CountryId { get; set; }

        [JsonIgnore]
        public Country? Country { get; set; }

        public ApplicationStatus Status { get; set; }

        public bool IsPaid { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool IsDeleted { get; set; }

        public string? DocumentPath { get; set; }

        public List<Document> Documents { get; set; } = new(); 
        

        

    }

}

