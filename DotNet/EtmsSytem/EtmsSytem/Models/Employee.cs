using System;
using System.Collections.Generic;

namespace EtmsSytem.Models;

public partial class Employee
{
    public int Id { get; set; }

    public int LoginId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int ContactNo { get; set; }

    public string EmailId { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int DesigId { get; set; }

    public virtual Designation Desig { get; set; } = null!;

    public virtual Login Login { get; set; } = null!;

    public virtual ICollection<Project> ProjectAssignedToNavigations { get; set; } = new List<Project>();

    public virtual ICollection<Project> ProjectCreatedByNavigations { get; set; } = new List<Project>();

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
}
