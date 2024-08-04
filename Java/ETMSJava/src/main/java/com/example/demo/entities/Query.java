package com.example.demo.entities;



import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String queryText;

    @Column(nullable = false)
    private String createdText;

    @Column(nullable = false)
    private int raisedBy;

    @Column(nullable = false)
    private int taskId;

    @ManyToOne
    @JoinColumn(name = "raisedBy", insertable = false, updatable = false)
    private Employee raisedByNavigation;

    @OneToMany(mappedBy = "query", cascade = CascadeType.ALL)
    private List<Solution> solutions;

    @ManyToOne
    @JoinColumn(name = "taskId", insertable = false, updatable = false)
    private Task task;

    // Getters and Setters
    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQueryText() {
        return queryText;
    }

    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }

    public String getCreatedText() {
        return createdText;
    }

    public void setCreatedText(String createdText) {
        this.createdText = createdText;
    }

    public int getRaisedBy() {
        return raisedBy;
    }

    public void setRaisedBy(int raisedBy) {
        this.raisedBy = raisedBy;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public Employee getRaisedByNavigation() {
        return raisedByNavigation;
    }

    public void setRaisedByNavigation(Employee raisedByNavigation) {
        this.raisedByNavigation = raisedByNavigation;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(qid, status, queryText, createdText, raisedBy, taskId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Query query = (Query) o;
        return qid == query.qid &&
               raisedBy == query.raisedBy &&
               taskId == query.taskId &&
               Objects.equals(status, query.status) &&
               Objects.equals(queryText, query.queryText) &&
               Objects.equals(createdText, query.createdText);
    }
}
