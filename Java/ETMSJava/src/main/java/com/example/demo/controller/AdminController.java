package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.service.AdminService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Create Employee
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return adminService.createEmployee(employee);
    }

    // Create Client
    @PostMapping("/clients")
    public Client createClient(@RequestBody Client client) {
        return adminService.createClient(client);
    }

    // Create Project
    @PostMapping("/projects")
    public Project createProject(@RequestBody Project project) {
        return adminService.createProject(project);
    }

    // View All Employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return adminService.getAllEmployees();
    }

    // View Employee by ID
    @GetMapping("/employees/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return adminService.getEmployeeById(id);
    }

    // View All Clients
    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return adminService.getAllClients();
    }

    // View Client by ID
    @GetMapping("/clients/{id}")
    public Client getClientById(@PathVariable int id) {
        return adminService.getClientById(id);
    }

    // View All Projects
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return adminService.getAllProjects();
    }

    // View Project by ID
    @GetMapping("/projects/{id}")
    public Project getProjectById(@PathVariable int id) {
        return adminService.getProjectById(id);
    }

    // Update Profile (for an employee)
    @PutMapping("/employees/{id}")
    public Employee updateProfile(@PathVariable int id, @RequestBody Employee updatedEmployee) {
        return adminService.updateProfile(id, updatedEmployee);
    }

    // Change Password
    @PutMapping("/change-password/{loginId}")
    public boolean changePassword(@PathVariable int loginId, @RequestBody String newPassword) {
        return adminService.changePassword(loginId, newPassword);
    }
}
