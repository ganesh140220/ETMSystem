using System;
using System.Collections.Generic;

namespace EtmsSystem.Models;

public partial class Designation
{
    public int DesigId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
