package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.entities.TeamMember;
import com.example.demo.service.ManagerService;

import java.util.List;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    // Create Associate (Employee)
    @PostMapping("/createAssociate")
    public Employee createAssociate(@RequestBody Employee employee) {
        return managerService.createAssociate(employee);
    }

    // View all Associates
    @GetMapping("/associates")
    public List<Employee> getAllAssociates() {
        return managerService.getAllAssociates();
    }

    // View Associate by ID
    @GetMapping("/associate/{id}")
    public Employee getAssociateById(@PathVariable int id) {
        return managerService.getAssociateById(id);
    }

    // Create Team Member
    @PostMapping("/createTeamMember")
    public TeamMember createTeamMember(@RequestParam int employeeId, @RequestParam int projectId) {
        return managerService.createTeamMember(employeeId, projectId);
    }

    // Create Task
    @PostMapping("/createTask")
    public Task createTask(@RequestBody Task task) {
        return managerService.createTask(task);
    }

    // Check Task Progress by ID
    @GetMapping("/task/{id}")
    public Task getTaskById(@PathVariable int id) {
        return managerService.getTaskById(id);
    }

    // View Queries by Task ID
    @GetMapping("/queries/{taskId}")
    public List<Query> getQueriesByTaskId(@PathVariable int taskId) {
        return managerService.getQueriesByTaskId(taskId);
    }

    // Provide Solution to a Query
    @PostMapping("/provideSolution")
    public Solution provideSolutionToQuery(@RequestParam int queryId, @RequestBody Solution solution) {
        return managerService.provideSolutionToQuery(queryId, solution);
    }

    // View Profile Details
    @GetMapping("/profile/{id}")
    public Employee getProfileDetails(@PathVariable int id) {
        return managerService.getProfileDetails(id);
    }

    // Update Profile
    @PutMapping("/profile/{id}")
    public Employee updateProfile(@PathVariable int id, @RequestBody Employee updatedEmployee) {
        return managerService.updateProfile(id, updatedEmployee);
    }
}
