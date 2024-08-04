package com.example.demo.entities;



import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(int assignedTo) {
        this.assignedTo = assignedTo;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public Employee getAssignedToNavigation() {
        return assignedToNavigation;
    }

    public void setAssignedToNavigation(Employee assignedToNavigation) {
        this.assignedToNavigation = assignedToNavigation;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Query> getQueries() {
        return queries;
    }

    public void setQueries(List<Query> queries) {
        this.queries = queries;
    }

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

