package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Task;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.QueryRepository;
import com.example.demo.repository.SolutionRepository;

@Service
public class EmployeeService {

    @Autowired
    TaskRepository taskRepository;
    
    @Autowired
    EmployeeRepository employeeRepository;
    
    @Autowired
    QueryRepository queryRepository;
    
    @Autowired
    SolutionRepository solutionRepository;

    // Retrieve tasks assigned to a specific employee
    public List<Task> getTasksByEmployeeId(int employeeId) {
        return taskRepository.findByAssignedTo(employeeId);
    }
    
    // Retrieve employee details by employee ID
    public Employee getEmployeeDetailsbyId(int employeeID) {
        return employeeRepository.findById(employeeID).orElse(null);
    }

    // Update the status of a specific task
    public void updateTaskStatus(int taskId, String status) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setStatus(status);
            taskRepository.save(task);
        }
    }

    // Create a query for a specific task
    public void createTaskQuery(int taskId, Query query) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            query.setTask(task);  // Associate the query with the task
            queryRepository.save(query);
        }
    }

    // Retrieve a solution for a specific query by query ID
    public List<Solution> getSolutionsByQueryId(int queryId) {
        return solutionRepository.findByQueryId(queryId);
    }

    // Update the progress of a specific task
    
}
