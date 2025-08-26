using Microsoft.AspNetCore.Mvc;
using visa_application_manager.Data;
using visa_application_manager.Models;
using visa_application_manager.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using visa_application_manager.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace visa_application_manager.Controllers
{
    
    [Authorize(Roles = "superAdminAdmin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly VisaDbContext _context;
        private readonly JwtHelper _jwtHelper;
public AuthController(VisaDbContext context, JwtHelper jwtHelper)
{
    _context = context;
    _jwtHelper = jwtHelper;
}


        [AllowAnonymous]
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] AdminLoginDto login)
{
    var admin = await _context.Admins
        .FirstOrDefaultAsync(a => a.Username == login.Username && a.Password == login.Password);

    if (admin == null)
        return Unauthorized("Invalid credentials.");

    var token = _jwtHelper.GenerateToken(admin);
    return Ok(new { token });
}

    }
}
