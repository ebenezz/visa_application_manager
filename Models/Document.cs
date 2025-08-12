namespace visa_application_manager.Models
{
    public class Document
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Url { get; set; } = "";

        public int ApplicationId { get; set; }

        public Application Application { get; set; } = null!;
    }
}