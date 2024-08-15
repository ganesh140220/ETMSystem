package com.example.demo.entities;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Objects;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "team_members")
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;

    @Column(nullable = false)
    private int projectId;

    @Column(nullable = false)
    private int empId;

    @OneToOne
    @JoinColumn(name = "empId", insertable = false, updatable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "projectId", insertable = false, updatable = false)
    private Project project;



    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(teamId, projectId, empId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamMember that = (TeamMember) o;
        return teamId == that.teamId &&
               projectId == that.projectId &&
               empId == that.empId;
    }
}
