package com.example.demo.entities;


import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private int solvedBy;

    @Column(nullable = false)
    private int qid;

    @ManyToOne
    @JoinColumn(name = "qid", insertable = false, updatable = false)
    private Query query;

    @ManyToOne
    @JoinColumn(name = "solvedBy", insertable = false, updatable = false)
    private Employee solvedByNavigation;

    // Getters and Setters
    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public int getSolvedBy() {
        return solvedBy;
    }

    public void setSolvedBy(int solvedBy) {
        this.solvedBy = solvedBy;
    }

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public Query getQuery() {
        return query;
    }

    public void setQuery(Query query) {
        this.query = query;
    }

    public Employee getSolvedByNavigation() {
        return solvedByNavigation;
    }

    public void setSolvedByNavigation(Employee solvedByNavigation) {
        this.solvedByNavigation = solvedByNavigation;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(sid, description, createdDate, solvedBy, qid);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Solution solution = (Solution) o;
        return sid == solution.sid &&
               solvedBy == solution.solvedBy &&
               qid == solution.qid &&
               Objects.equals(description, solution.description) &&
               Objects.equals(createdDate, solution.createdDate);
    }
}

