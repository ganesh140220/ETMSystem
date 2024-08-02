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

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=etmsystem;user=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.37-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Empid).HasName("PRIMARY");

            entity.ToTable("employee");

            entity.HasIndex(e => e.Loginid, "loginid_idx").IsUnique();

            entity.Property(e => e.Empid)
                .ValueGeneratedNever()
                .HasColumnName("empid");
            entity.Property(e => e.Contactno).HasColumnName("contactno");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(45)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(45)
                .HasColumnName("lastname");
            entity.Property(e => e.Loginid).HasColumnName("loginid");

            entity.HasOne(d => d.Login).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.Loginid)
                .HasConstraintName("loginid");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Loginid).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.Roleid, "roleid_idx");

            entity.Property(e => e.Loginid)
                .ValueGeneratedNever()
                .HasColumnName("loginid");
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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
