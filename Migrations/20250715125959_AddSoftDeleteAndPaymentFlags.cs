using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace visa_application_manager.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftDeleteAndPaymentFlags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Countries",
                type: "bit",
                nullable: false,
                defaultValue: false);

            _ = migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Applications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            _ = migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Applications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Countries");

            _ = migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Applications");

            _ = migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Applications");
        }
    }
}
