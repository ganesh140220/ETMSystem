using System;
using System.Collections.Generic;

namespace EtmsSytem.Models;

public partial class Query
{
    public int Qid { get; set; }

    public string Title { get; set; }
    public string CreatedDate { get; set; } = null!;

    public string QueryText { get; set; } = null!;

    public int? RaisedBy { get; set; }

    public string Status { get; set; } = null!;

    public int TaskId { get; set; }

    public virtual Employee RaisedByNavigation { get; set; } = null!;

    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();

    public virtual Task Task { get; set; } = null!;
}
