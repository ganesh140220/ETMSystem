using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace EtmsSytem.Models;

public partial class EtmsystemContext : DbContext
{
    public EtmsystemContext()
    {
    }

    public EtmsystemContext(DbContextOptions<EtmsystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Designation> Designations { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Query> Queries { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Solution> Solutions { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<TaskProgress> TaskProgresses { get; set; }

    public virtual DbSet<TeamMember> TeamMembers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=etmsystem;user=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.37-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("client");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(255)
                .HasColumnName("contact_no");
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .HasColumnName("email_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Designation>(entity =>
        {
            entity.HasKey(e => e.DesigId).HasName("PRIMARY");

            entity.ToTable("designation");

            entity.Property(e => e.DesigId)
                .ValueGeneratedNever()
                .HasColumnName("desig_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("employee");

            entity.HasIndex(e => e.DesigId, "FKmr55wiec420mxhu78p2f1eebl");

            entity.HasIndex(e => e.LoginId, "login_id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.ContactNo).HasColumnName("contact_no");
            entity.Property(e => e.DesigId).HasColumnName("desig_id");
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .HasColumnName("email_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.LoginId).HasColumnName("login_id");

            entity.HasOne(d => d.Desig).WithMany(p => p.Employees)
                .HasForeignKey(d => d.DesigId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKmr55wiec420mxhu78p2f1eebl");

            entity.HasOne(d => d.Login).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.LoginId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK13jn542578lslhr6drjt21kps");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Loginid).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.Roleid, "FK7556csmui0fcfn2ssqxmyt313");

            entity.Property(e => e.Loginid).HasColumnName("loginid");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.Roleid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK7556csmui0fcfn2ssqxmyt313");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("project");

            entity.HasIndex(e => e.CreatedBy, "FK4232xu771fp6nuh1so7e7tjok");

            entity.HasIndex(e => e.ClientId, "FK8nw995uro0115f1go0dmrtn2d");

            entity.HasIndex(e => e.AssignedTo, "FKf7d0rp3hf66ayydxtma968nsc");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedDate)
                .HasMaxLength(255)
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.ProjectTitle)
                .HasMaxLength(255)
                .HasColumnName("project_title");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.ProjectAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKf7d0rp3hf66ayydxtma968nsc");

            entity.HasOne(d => d.Client).WithMany(p => p.Projects)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK8nw995uro0115f1go0dmrtn2d");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ProjectCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK4232xu771fp6nuh1so7e7tjok");
        });

        modelBuilder.Entity<Query>(entity =>
        {
            entity.HasKey(e => e.Qid).HasName("PRIMARY");

            entity.ToTable("query");

            entity.HasIndex(e => e.RaisedBy, "FK4k9qk5xo277qmfj9vsvthtfqa");

            entity.HasIndex(e => e.TaskId, "FK76i946ly66s6yee6efws38fiw");

            entity.Property(e => e.Qid).HasColumnName("qid");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.CreatedText)
                .HasMaxLength(255)
                .HasColumnName("created_text");
            entity.Property(e => e.QueryText)
                .HasMaxLength(255)
                .HasColumnName("query_text");
            entity.Property(e => e.RaisedBy).HasColumnName("raised_by");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.TaskId).HasColumnName("task_id");

            entity.HasOne(d => d.RaisedByNavigation).WithMany(p => p.Queries)
                .HasForeignKey(d => d.RaisedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK4k9qk5xo277qmfj9vsvthtfqa");

            entity.HasOne(d => d.Task).WithMany(p => p.Queries)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK76i946ly66s6yee6efws38fiw");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Role1)
                .HasMaxLength(255)
                .HasColumnName("role");
        });

        modelBuilder.Entity<Solution>(entity =>
        {
            entity.HasKey(e => e.Sid).HasName("PRIMARY");

            entity.ToTable("solution");

            entity.HasIndex(e => e.Qid, "FKdejvwyrdtre81284e40d59gbd");

            entity.HasIndex(e => e.SolvedBy, "FKt75vm71i2fc5gv0q2blntf8md");

            entity.Property(e => e.Sid).HasColumnName("sid");
            entity.Property(e => e.CreatedDate)
                .HasMaxLength(255)
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Qid).HasColumnName("qid");
            entity.Property(e => e.SolvedBy).HasColumnName("solved_by");

            entity.HasOne(d => d.QidNavigation).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.Qid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKdejvwyrdtre81284e40d59gbd");

            entity.HasOne(d => d.SolvedByNavigation).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.SolvedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKt75vm71i2fc5gv0q2blntf8md");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("task");

            entity.HasIndex(e => e.AssignedTo, "FKfs0bgcnqw1nl8wu2oe8m2hxi5");

            entity.HasIndex(e => e.ProjectId, "FKk8qrwowg31kx7hp93sru1pdqa");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.CreatedDate)
                .HasMaxLength(255)
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.DueDate)
                .HasMaxLength(255)
                .HasColumnName("due_date");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKfs0bgcnqw1nl8wu2oe8m2hxi5");

            entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKk8qrwowg31kx7hp93sru1pdqa");
        });

        modelBuilder.Entity<TaskProgress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("task_progress");

            entity.HasIndex(e => e.TaskId, "FK2cueuy9hcfpratrhb30ia7i5a");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.UpdateDate)
                .HasMaxLength(255)
                .HasColumnName("update_date");
            entity.Property(e => e.WorkDonePercent).HasColumnName("work_done_percent");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskProgresses)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK2cueuy9hcfpratrhb30ia7i5a");
        });

        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.HasKey(e => e.TeamId).HasName("PRIMARY");

            entity.ToTable("team_members");

            entity.HasIndex(e => e.EmpId, "empi_idx");

            entity.HasIndex(e => e.ProjectId, "proj_idx");

            entity.Property(e => e.TeamId)
                .ValueGeneratedNever()
                .HasColumnName("team_id");
            entity.Property(e => e.EmpId).HasColumnName("emp_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");

            entity.HasOne(d => d.Emp).WithMany(p => p.TeamMembers)
                .HasForeignKey(d => d.EmpId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("empi");

            entity.HasOne(d => d.Project).WithMany(p => p.TeamMembers)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("proj");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
