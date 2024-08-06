using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Query
{
    public int Qid { get; set; }

    public string CreatedText { get; set; } = null!;

    public string QueryText { get; set; } = null!;

    public int RaisedBy { get; set; }

    public string Status { get; set; } = null!;

    public int TaskId { get; set; }

    public virtual Employee RaisedByNavigation { get; set; } = null!;

    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();

    public virtual Task Task { get; set; } = null!;
}
