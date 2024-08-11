using System;
using System.Collections.Generic;

namespace EtmsSystem.Models;

public partial class Client
{
    public int Id { get; set; }

    public string? ContactNo { get; set; }

    public string? EmailId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
