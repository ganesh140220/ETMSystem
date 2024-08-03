using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class TaskProgress
{
    public int Tid { get; set; }

    public string UpdateDate { get; set; } = null!;

    public float WorkdonePercent { get; set; }

    public string Description { get; set; } = null!;

    public int TaskId { get; set; }

    public virtual Task Task { get; set; } = null!;
}
