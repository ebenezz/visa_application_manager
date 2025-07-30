// Models/DTOs/ApplicationSummaryDto.cs
namespace VisaApplicationManager.Models.DTOs
{
    public class ApplicationSummaryDto
    {
        public int Total { get; set; }
        public int Pending { get; set; }
        public int Approved { get; set; }
        public int Rejected { get; set; }
    }
}
