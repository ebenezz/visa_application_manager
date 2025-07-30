public class AuditLog
{
    public int Id { get; set; }
    public string AdminUsername { get; set; } = null!;
    public string Action { get; set; } = null!;
    public string Entity { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
}
