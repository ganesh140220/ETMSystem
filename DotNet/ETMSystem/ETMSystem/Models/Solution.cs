using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Solution
{
    public int Id { get; set; }

    public string CompletionDate { get; set; } = null!;

    public string SolutionText { get; set; } = null!;

    public int SolvedBy { get; set; }

    public int QueryId { get; set; }

    public virtual Query Query { get; set; } = null!;

    public virtual Employee SolvedByNavigation { get; set; } = null!;
}
