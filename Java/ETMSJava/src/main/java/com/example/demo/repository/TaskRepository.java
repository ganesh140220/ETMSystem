package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Task;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

	List<Task> findByAssignedTo(int employeeId);

	

	
}
