package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.TaskProgress;

public interface TaskProgressRepository extends JpaRepository<TaskProgress,Integer> {

}
