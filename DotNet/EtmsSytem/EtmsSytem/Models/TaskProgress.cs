using System;
using System.Collections.Generic;

namespace EtmsSytem.Models;

public partial class TaskProgress
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int TaskId { get; set; }

    public string UpdateDate { get; set; } = null!;

    public float WorkDonePercent { get; set; }

    public virtual Task Task { get; set; } = null!;
}
