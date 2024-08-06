package com.example.demo.entities;


import java.util.Objects;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "solution")
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

