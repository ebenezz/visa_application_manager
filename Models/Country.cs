namespace visa_application_manager.Models
{
    public class Country
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Requirements { get; set; }
        public decimal VisaFee { get; set; }
        public int ProcessingTimeInDays { get; set; }

        public ICollection<Application> Applications { get; set; } = new List<Application>();
        public bool IsDeleted { get; set; } = false;


    }
}