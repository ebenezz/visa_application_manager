using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using visa_application_manager.Models;
using QPdf = QuestPDF.Fluent.Document;

public static class ApplicationPdfGenerator
{
    public static byte[] Generate(Application app)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        return QPdf.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.DefaultTextStyle(x => x.FontSize(12));
                page.Content().Column(col =>
                {
                    col.Item().PaddingBottom(10).Text("Visa Application Summary").Bold().FontSize(18).Underline();

                    col.Item().Text($"Name: {app.ApplicantName}");
                    col.Item().Text($"Passport: {app.PassportNumber}");
                    col.Item().Text($"Email: {app.Email}");
                    col.Item().Text($"Phone: {app.PhoneNumber}");
                    col.Item().Text($"Country: {app.Country?.Name}");
                    col.Item().Text($"Status: {app.Status}");
                    col.Item().Text($"Submitted: {app.CreatedAt:d}");

                    if (app.Documents.Any())
                    {
                        col.Item().PaddingTop(10).Text("Documents:").Bold();
                        foreach (var doc in app.Documents)
                        {
                            col.Item().Text($"• {doc.Name} ({doc.Url})");
                        }
                    }
                    else
                    {
                        col.Item().Text("No documents uploaded.");
                    }
                });
            });
        }).GeneratePdf();
    }
}