using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Solution
{
    public int Sid { get; set; }

    public string CreatedDate { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Qid { get; set; }

    public int SolvedBy { get; set; }

    public virtual Query QidNavigation { get; set; } = null!;

    public virtual Employee SolvedByNavigation { get; set; } = null!;
}
