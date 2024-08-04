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
