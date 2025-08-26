using Microsoft.AspNetCore.Mvc;
using visa_application_manager.Data;
using visa_application_manager.Models;


namespace visa_application_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly VisaDbContext _context;

        public AdminController(VisaDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public IActionResult CreateAdmin([FromBody] Admin newAdmin)
        {
            var currentUser = GetCurrentAdmin();

            if (currentUser == null || currentUser.Role != AdminRole.SuperAdmin)
                return StatusCode(403, "Only SuperAdmins can create new admins.");

            newAdmin.Role = AdminRole.Admin;
            _context.Admins.Add(newAdmin);
            _context.SaveChanges();

            return Ok(newAdmin);
        }

        private Admin? GetCurrentAdmin()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username)) return null;

            return _context.Admins.FirstOrDefault(a => a.Username == username);
        }
    }
}