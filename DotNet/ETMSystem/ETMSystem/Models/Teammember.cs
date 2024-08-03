using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class TeamMember
{
    public int EmployeeId { get; set; }

    public int ProjectId { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;
}
