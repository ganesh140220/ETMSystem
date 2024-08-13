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

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_date", nullable = false)
    private String createdDate;

    @Column(name = "due_date", nullable = false)
    private String dueDate;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "assigned_to", nullable = false)
    private int assignedTo;

    @Column(name = "project_id", nullable = false)
    private int projectId;

    @Column(name = "completed_date")
    private String completedDate; // Add this field if it exists in the table

    @ManyToOne
    @JoinColumn(name = "assigned_to", insertable = false, updatable = false)
    private Employee assignedToNavigation;

    @ManyToOne
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Query> queries;
    
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<TaskProgress> taskProgress;

    @Override
    public int hashCode() {
        return Objects.hash(assignedTo, assignedToNavigation, createdDate, description, dueDate, id, project, projectId,
                queries, status, taskProgress, title, completedDate);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Task other = (Task) obj;
        return assignedTo == other.assignedTo && Objects.equals(assignedToNavigation, other.assignedToNavigation)
                && Objects.equals(createdDate, other.createdDate) && Objects.equals(description, other.description)
                && Objects.equals(dueDate, other.dueDate) && id == other.id && Objects.equals(project, other.project)
                && projectId == other.projectId && Objects.equals(queries, other.queries)
                && Objects.equals(status, other.status) && Objects.equals(taskProgress, other.taskProgress)
                && Objects.equals(title, other.title) && Objects.equals(completedDate, other.completedDate);
    }
    
    public void updateStatusBasedOnProgress(float workDonePercent) {
        if (workDonePercent == 0) {
            this.status = "Pending";
        } else if (workDonePercent > 0 && workDonePercent < 100) {
            this.status = "In Progress";
        } else if (workDonePercent == 100) {
            this.status = "Completed";
        }
    }
}
