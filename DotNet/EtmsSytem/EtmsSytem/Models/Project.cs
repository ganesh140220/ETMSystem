using System;
using System.Collections.Generic;

namespace EtmsSytem.Models
{
    public partial class Project
    {
        public int Id { get; set; }

        // Change to nullable int
        public int? AssignedTo { get; set; } // Nullable integer

        public int ClientId { get; set; }

        public int CreatedBy { get; set; }

        public string CreatedDate { get; set; } = null!;

        public string? CompletedDate { get; set; }
        public string Description { get; set; } = null!;

        public string ProjectTitle { get; set; } = null!;

        public string Status { get; set; } = null!;

        public virtual Employee? AssignedToNavigation { get; set; } // Nullable navigation property

        public virtual Client Client { get; set; } = null!;

        public virtual Employee CreatedByNavigation { get; set; } = null!;

        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

        public virtual ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
    }
}
