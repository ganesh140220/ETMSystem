package com.example.demo.entities;



import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

    public int getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(int assignedTo) {
        this.assignedTo = assignedTo;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public Employee getAssignedToNavigation() {
        return assignedToNavigation;
    }

    public void setAssignedToNavigation(Employee assignedToNavigation) {
        this.assignedToNavigation = assignedToNavigation;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Employee getCreatedByNavigation() {
        return createdByNavigation;
    }

    public void setCreatedByNavigation(Employee createdByNavigation) {
        this.createdByNavigation = createdByNavigation;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<TeamMember> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<TeamMember> teamMembers) {
        this.teamMembers = teamMembers;
    }

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
