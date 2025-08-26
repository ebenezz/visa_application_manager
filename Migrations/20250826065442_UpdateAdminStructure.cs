using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace visa_application_manager.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Admins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Role", "Username" },
                values: new object[] { "supersecure", 0, "superadmin" });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Password", "Role", "Username" },
                values: new object[] { 2, "admin123", 1, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Admins");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Username" },
                values: new object[] { "admin123", "admin" });
        }
    }
}
