package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.entities.Task;
import com.example.demo.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Retrieve tasks assigned to a specific employee
    @GetMapping("/tasks/{employeeId}")
    public List<Task> getTasksByEmployeeId(@PathVariable int employeeId) {
        return employeeService.getTasksByEmployeeId(employeeId);
    }

    // Retrieve employee details by employee ID
    @GetMapping("/details/{employeeId}")
    public Employee getEmployeeDetailsById(@PathVariable int employeeId) {
        return employeeService.getEmployeeDetailsbyId(employeeId);
    }

    // Update the status of a specific task
    @PutMapping("/task/status/{taskId}")
    public void updateTaskStatus(@PathVariable int taskId, @RequestParam String status) {
        employeeService.updateTaskStatus(taskId, status);
    }

    // Create a query for a specific task
    @PostMapping("/task/query/{taskId}")
    public void createTaskQuery(@PathVariable int taskId, @RequestBody Query query) {
        employeeService.createTaskQuery(taskId, query);
    }

    // Retrieve solutions for a specific query
    @GetMapping("/solutions/{queryId}")
    public List<Solution> getSolutionsByQueryId(@PathVariable int queryId) {
        return employeeService.getSolutionsByQueryId(queryId);
    }
}
