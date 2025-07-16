using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace visa_application_manager.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "IsDeleted", "Name", "ProcessingTimeInDays", "Requirements", "VisaFee" },
                values: new object[,]
                {
                    { 1, false, "USA", 7, "Passport, Photo", 160m },
                    { 2, false, "Canada", 10, "Passport, Photo", 100m }
                });

            migrationBuilder.InsertData(
                table: "Applications",
                columns: new[] { "Id", "ApplicantName", "CountryId", "CreatedAt", "Email", "IsDeleted", "IsPaid", "PassportNumber", "PhoneNumber", "Status" },
                values: new object[,]
                {
                    { 1, "John Doe", 1, new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "john@example.com", false, false, "A1234567", "1234567890", "Pending" },
                    { 2, "Jane Smith", 2, new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "jane@example.com", false, true, "B7654321", "0987654321", "Approved" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Applications",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Applications",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
