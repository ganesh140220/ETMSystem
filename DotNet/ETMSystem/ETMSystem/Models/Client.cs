using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Client
{
    public int Id { get; set; }

    public string ContactNo { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
