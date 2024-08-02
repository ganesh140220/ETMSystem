using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Employee
{
    public int Empid { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public int Contactno { get; set; }

    public string Email { get; set; } = null!;

    public int Loginid { get; set; }

    public virtual Login Login { get; set; } = null!;
}
