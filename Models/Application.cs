namespace visa_application_manager.Models
{
    public class Application
    {
        public int Id { get; set; }
        public required string ApplicantName { get; set; }
        public required string PassportNumber { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public int CountryId { get; set; }
        public required string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public Country? Country { get; set; }
       public bool IsDeleted { get; set; } = false;
public bool IsPaid { get; set; } = false;


    }
}