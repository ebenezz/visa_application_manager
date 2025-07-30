
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using visa_application_manager.Data;
using visa_application_manager.Models;
using VisaApplicationManager.Models.DTOs;
using static System.Net.Mime.MediaTypeNames;
using Application = visa_application_manager.Models.Application;

namespace visa_application_manager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly VisaDbContext _context;

        public ApplicationController(VisaDbContext context)
        {
            _context = context;
        }

        // GET: api/application?status=Pending&countryId=1
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? status, [FromQuery] int? countryId)
        {
            var query = _context.Applications
                .Include(a => a.Country)
                .Where(a => !a.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                bool isValidStatus = Enum.TryParse<ApplicationStatus>(status, ignoreCase: true, out var parsedStatus);
                if (isValidStatus)
                {
                    query = query.Where(a => a.Status == parsedStatus);
                }
                else
                {
                    return BadRequest("Invalid status value.");
                }
            }

            if (countryId.HasValue)
            {
                query = query.Where(a => a.CountryId == countryId.Value);
            }

            var apps = await query.ToListAsync();
            return Ok(apps);
        }

        // GET: api/application/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var app = await _context.Applications
                .Include(a => a.Country)
                .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);

            if (app == null) return NotFound();
            return Ok(app);
        }

        // POST: api/application
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Application app)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            app.CreatedAt = DateTime.UtcNow;
            app.IsDeleted = false;
            _context.AuditLogs.Add(new AuditLog
            {
                AdminUsername = "admin", // Replace with JWT-based user if implemented
                Action = "Create",
                Entity = "Application",
                Description = $"Created application for {app.ApplicantName}",
                Timestamp = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();


            _context.Applications.Add(app);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = app.Id }, app);
        }

        // PUT: api/application/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Application updatedApp)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var app = await _context.Applications.FindAsync(id);
            if (app == null || app.IsDeleted)
                return NotFound();

            app.ApplicantName = updatedApp.ApplicantName;
            app.PassportNumber = updatedApp.PassportNumber;
            app.Email = updatedApp.Email;
            app.PhoneNumber = updatedApp.PhoneNumber;
            app.CountryId = updatedApp.CountryId;
            app.Status = updatedApp.Status;
            app.IsPaid = updatedApp.IsPaid;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/application/5 (Soft Delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null || app.IsDeleted)
                return NotFound();

            app.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/upload")]
        public async Task<IActionResult> UploadDocument(int id, IFormFile file)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var fullPath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            app.DocumentPath = fileName;



            // Audit log
            _context.AuditLogs.Add(new AuditLog
            {
                AdminUsername = "admin", // Replace with token user if JWT is used
                Action = "Upload Document",
                Entity = "Application",
                Description = $"Uploaded {file.FileName} for application {id}",
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return Ok(new { fileName, url = $"/files/{fileName}" });

        }





        [HttpGet("summary")]
        public async Task<ActionResult<ApplicationSummaryDto>> GetSummary()
        {
            var total = await _context.Applications.CountAsync();
            var pending = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Pending);
            var approved = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Approved);
            var rejected = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Rejected);

            var summary = new ApplicationSummaryDto
            {
                Total = total,
                Pending = pending,
                Approved = approved,
                Rejected = rejected
            };

            return Ok(summary);
        }


    }
}


