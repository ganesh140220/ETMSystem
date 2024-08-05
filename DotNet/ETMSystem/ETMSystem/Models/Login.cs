﻿using System;
using System.Collections.Generic;

namespace ETMSystem.Models;

public partial class Login
{
    public int Loginid { get; set; }

    public int Active { get; set; }

    public string Password { get; set; } = null!;

    public int Roleid { get; set; }

    public string Username { get; set; } = null!;

    public virtual Employee? Employee { get; set; }

    public virtual Role Role { get; set; } = null!;
}
