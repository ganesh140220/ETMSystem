package com.example.demo.entities;



import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String projectTitle;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int createdBy;

    @Column(nullable = false)
    private int assignedTo;

    @Column(nullable = false)
    private int clientId;
    
    @Column(nullable = true)
    private String completedDate;

    @ManyToOne
    @JoinColumn(name = "assignedTo", insertable = false, updatable = false)
    private Employee assignedToNavigation;

    @ManyToOne
    @JoinColumn(name = "clientId", insertable = false, updatable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "createdBy", insertable = false, updatable = false)
    private Employee createdByNavigation;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<TeamMember> teamMembers;


    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(id, projectTitle, status, createdDate, description, createdBy, assignedTo, clientId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return id == project.id &&
               createdBy == project.createdBy &&
               assignedTo == project.assignedTo &&
               clientId == project.clientId &&
               Objects.equals(projectTitle, project.projectTitle) &&
               Objects.equals(status, project.status) &&
               Objects.equals(createdDate, project.createdDate) &&
               Objects.equals(description, project.description);
    }
}
