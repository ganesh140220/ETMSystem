package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.TaskProgress;

import java.util.List;

@Repository
public interface TaskProgressRepository extends JpaRepository<TaskProgress, Integer> {

 
    List<TaskProgress> findByTaskId(Integer taskId);

 
}
