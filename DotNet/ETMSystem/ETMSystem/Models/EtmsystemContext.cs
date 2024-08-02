using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace ETMSystem.Models;

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

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(45)
                .HasColumnName("contact_no");
            entity.Property(e => e.EmailId)
                .HasMaxLength(45)
                .HasColumnName("email_id");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
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
                .HasMaxLength(45)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("employee");

            entity.HasIndex(e => e.DesigId, "fkdesig_idx");

            entity.HasIndex(e => e.LoginId, "login_id_UNIQUE").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(45)
                .HasColumnName("address");
            entity.Property(e => e.ContactNo).HasColumnName("contact_no");
            entity.Property(e => e.DesigId).HasColumnName("desig_id");
            entity.Property(e => e.EmailId)
                .HasMaxLength(45)
                .HasColumnName("email_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(45)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(45)
                .HasColumnName("last_name");
            entity.Property(e => e.LoginId).HasColumnName("login_id");

            entity.HasOne(d => d.Desig).WithMany(p => p.Employees)
                .HasForeignKey(d => d.DesigId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkdesig");

            entity.HasOne(d => d.Login).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.LoginId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fklogin");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Loginid).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.Roleid, "roleid_idx");

            entity.Property(e => e.Loginid)
                .ValueGeneratedNever()
                .HasColumnName("loginid");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Username)
                .HasMaxLength(45)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.Roleid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("roleid");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("project");

            entity.HasIndex(e => e.CreatedBy, "fkadmin_id_idx");

            entity.HasIndex(e => e.ClientId, "fkclient_id_idx");

            entity.HasIndex(e => e.AssignedTo, "fkmanager_id_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedDate)
                .HasMaxLength(45)
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(45)
                .HasColumnName("description");
            entity.Property(e => e.ProjectTitle)
                .HasMaxLength(45)
                .HasColumnName("project_title");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.ProjectAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkmanager_id");

            entity.HasOne(d => d.Client).WithMany(p => p.Projects)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkclient_id");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ProjectCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkadmin_id");
        });

        modelBuilder.Entity<Query>(entity =>
        {
            entity.HasKey(e => e.Qid).HasName("PRIMARY");

            entity.ToTable("query");

            entity.HasIndex(e => e.RaisedBy, "fkemployee_id_idx");

            entity.HasIndex(e => e.TaskId, "fktask_id_idx");

            entity.Property(e => e.Qid)
                .ValueGeneratedNever()
                .HasColumnName("qid");
            entity.Property(e => e.CreatedText)
                .HasMaxLength(45)
                .HasColumnName("created_text");
            entity.Property(e => e.QueryText)
                .HasMaxLength(45)
                .HasColumnName("query_text");
            entity.Property(e => e.RaisedBy).HasColumnName("raised_by");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.TaskId).HasColumnName("task_id");

            entity.HasOne(d => d.RaisedByNavigation).WithMany(p => p.Queries)
                .HasForeignKey(d => d.RaisedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkemp_id");

            entity.HasOne(d => d.Task).WithMany(p => p.Queries)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fktask1_id");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Roleid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Roleid)
                .ValueGeneratedNever()
                .HasColumnName("roleid");
            entity.Property(e => e.Rolename)
                .HasMaxLength(45)
                .HasColumnName("rolename");
        });

        modelBuilder.Entity<Solution>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("solution");

            entity.HasIndex(e => e.SolvedBy, "fkemp_id1_idx");

            entity.HasIndex(e => e.QueryId, "fkquery_id_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CompletionDate)
                .HasMaxLength(45)
                .HasColumnName("completion_date");
            entity.Property(e => e.QueryId).HasColumnName("query_id");
            entity.Property(e => e.SolutionText)
                .HasMaxLength(45)
                .HasColumnName("solution_text");
            entity.Property(e => e.SolvedBy).HasColumnName("solved_by");

            entity.HasOne(d => d.Query).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.QueryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkquery_id");

            entity.HasOne(d => d.SolvedByNavigation).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.SolvedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkemp_id1");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PRIMARY");

            entity.ToTable("task");

            entity.HasIndex(e => e.AssignedTo, "fkemployee_id_idx");

            entity.HasIndex(e => e.ProjectId, "fkproject_id_idx");

            entity.Property(e => e.TaskId)
                .ValueGeneratedNever()
                .HasColumnName("task_id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.CreatedDate)
                .HasMaxLength(45)
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(45)
                .HasColumnName("description");
            entity.Property(e => e.EndDate)
                .HasMaxLength(45)
                .HasColumnName("end_date");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.StartDate)
                .HasMaxLength(45)
                .HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkemployee_id");

            entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkproject_id");
        });

        modelBuilder.Entity<TaskProgress>(entity =>
        {
            entity.HasKey(e => e.Tid).HasName("PRIMARY");

            entity.ToTable("task_progress");

            entity.HasIndex(e => e.TaskId, "fktask_id_idx");

            entity.Property(e => e.Tid)
                .ValueGeneratedNever()
                .HasColumnName("tid");
            entity.Property(e => e.Description)
                .HasMaxLength(45)
                .HasColumnName("description");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.UpdateDate)
                .HasMaxLength(45)
                .HasColumnName("update_date");
            entity.Property(e => e.WorkdonePercent).HasColumnName("workdone_percent");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskProgresses)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fktask_id");
        });

        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PRIMARY");

            entity.ToTable("team_member");

            entity.HasIndex(e => e.ProjectId, "fkproject_id2_idx");

            entity.Property(e => e.EmployeeId)
                .ValueGeneratedNever()
                .HasColumnName("employee_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");

            entity.HasOne(d => d.Employee).WithOne(p => p.TeamMember)
                .HasForeignKey<TeamMember>(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkemp_id2");

            entity.HasOne(d => d.Project).WithMany(p => p.TeamMembers)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkproject_id2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
