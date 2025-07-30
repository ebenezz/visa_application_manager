using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using visa_application_manager.Data;

[ApiController]
[Route("api/[controller]")]
public class AuditLogController : ControllerBase
{
    private readonly VisaDbContext _context;

    public AuditLogController(VisaDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetLogs() =>
        Ok(await _context.AuditLogs.OrderByDescending(l => l.Timestamp).ToListAsync());
}