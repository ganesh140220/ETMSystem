using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Task
{
    public int TaskId { get; set; }

    public string CreatedDate { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int ProjectId { get; set; }

    public int AssignedTo { get; set; }

    public string StartDate { get; set; } = null!;

    public string? EndDate { get; set; }

    public virtual Employee AssignedToNavigation { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    public virtual ICollection<TaskProgress> TaskProgresses { get; set; } = new List<TaskProgress>();
}
