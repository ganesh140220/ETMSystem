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
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private String dueDate;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int assignedTo;

    @Column(nullable = false)
    private int projectId;

    @ManyToOne
    @JoinColumn(name = "assignedTo", insertable = false, updatable = false)
    private Employee assignedToNavigation;

    @ManyToOne
    @JoinColumn(name = "projectId", insertable = false, updatable = false)
    private Project project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Query> queries;


    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(id, title, status, createdDate, dueDate, description, assignedTo, projectId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id == task.id &&
               assignedTo == task.assignedTo &&
               projectId == task.projectId &&
               Objects.equals(title, task.title) &&
               Objects.equals(status, task.status) &&
               Objects.equals(createdDate, task.createdDate) &&
               Objects.equals(dueDate, task.dueDate) &&
               Objects.equals(description, task.description);
    }
}

