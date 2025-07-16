using Microsoft.EntityFrameworkCore;
using visa_application_manager.Data; // or your correct namespace for VisaDbContext


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<VisaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers(); // Needed for API endpoints

app.Run();
