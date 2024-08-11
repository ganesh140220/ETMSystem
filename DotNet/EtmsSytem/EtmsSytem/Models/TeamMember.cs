using System;
using System.Collections.Generic;

namespace EtmsSytem.Models;

public partial class TeamMember
{
    public int TeamId { get; set; }

    public int EmpId { get; set; }

    public int ProjectId { get; set; }

    public virtual Employee Emp { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;
}
