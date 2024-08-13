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
@Table(name = "query")
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;

    @Column(name = "title", nullable = false)
    private String title; 

    @Column(name = "created_date", nullable = false)
    private String createdDate; 

    @Column(name = "query_text", nullable = false)
    private String queryText;

    @Column(name = "raised_by", nullable = false)
    private int raisedBy;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "task_id", nullable = false)
    private int taskId;

    @ManyToOne
    @JoinColumn(name = "raised_by", insertable = false, updatable = false)
    private Employee raisedByNavigation;

    @OneToMany(mappedBy = "query", cascade = CascadeType.ALL)
    private List<Solution> solutions;

    @ManyToOne
    @JoinColumn(name = "task_id", insertable = false, updatable = false)
    private Task task;

    @Override
    public int hashCode() {
        return Objects.hash(qid, title, createdDate, queryText, raisedBy, status, taskId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Query query = (Query) o;
        return qid == query.qid &&
               raisedBy == query.raisedBy &&
               taskId == query.taskId &&
               Objects.equals(title, query.title) &&
               Objects.equals(status, query.status) &&
               Objects.equals(queryText, query.queryText) &&
               Objects.equals(createdDate, query.createdDate);
    }
}
