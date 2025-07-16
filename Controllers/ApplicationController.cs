using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using visa_application_manager.Data;
using visa_application_manager.Models;

namespace visa_application_manager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly VisaDbContext _context;

        public ApplicationController(VisaDbContext context)
        {
            _context = context;
        }

        // GET: api/application
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var apps = await _context.Applications
                .Where(a => !a.IsDeleted)
                .Include(a => a.Country)
                .ToListAsync();
            return Ok(apps);
        }

        // GET: api/application/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var app = await _context.Applications
                .Include(a => a.Country)
                .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);

            if (app == null)
                return NotFound();

            return Ok(app);
        }

        // POST: api/application
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Application app)
        {
            app.CreatedAt = DateTime.Now;
            app.IsDeleted = false;

            _context.Applications.Add(app);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = app.Id }, app);
        }

        // PUT: api/application/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Application updatedApp)
        {
            var app = await _context.Applications.FindAsync(id);

            if (app == null || app.IsDeleted)
                return NotFound();

            // Update fields
            app.ApplicantName = updatedApp.ApplicantName;
            app.PassportNumber = updatedApp.PassportNumber;
            app.Email = updatedApp.Email;
            app.PhoneNumber = updatedApp.PhoneNumber;
            app.CountryId = updatedApp.CountryId;
            app.Status = updatedApp.Status;
            // add payment and other fields as needed

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE (Soft Delete): api/application/5
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
    }
}
