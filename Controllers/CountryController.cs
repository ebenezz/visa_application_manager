using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using visa_application_manager.Data;
using visa_application_manager.Models;

namespace visa_application_manager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly VisaDbContext _context;

        public CountryController(VisaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var countries = await _context.Countries
                .Where(c => !c.IsDeleted)
                .ToListAsync();
            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var country = await _context.Countries
                .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

            if (country == null) return NotFound();

            return Ok(country);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Country country)
        {
            country.IsDeleted = false;

            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = country.Id }, country);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Country updatedCountry)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null || country.IsDeleted) return NotFound();

            country.Name = updatedCountry.Name;
            country.Requirements = updatedCountry.Requirements;
            country.VisaFee = updatedCountry.VisaFee;
            country.ProcessingTimeInDays = updatedCountry.ProcessingTimeInDays;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null || country.IsDeleted) return NotFound();

            country.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
