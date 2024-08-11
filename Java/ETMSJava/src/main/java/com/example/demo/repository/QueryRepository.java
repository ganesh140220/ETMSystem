package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Query;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<Query, Integer> {

    // Define the query method
    List<Query> findByTaskId(int taskId);
}
