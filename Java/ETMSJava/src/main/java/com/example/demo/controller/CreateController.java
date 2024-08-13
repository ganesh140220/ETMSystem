package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.service.CreateService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CreateController {

    @Autowired
    private CreateService employeeService;

    @PostMapping("/createEmployee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }
    
    @Autowired
    private CreateService createService;

    // controller to create project
    @PostMapping("/createproject")
    public Project createProject(@RequestBody Project project) {
        return createService.createProject(project);
    }

    // Controller to create a client
    @PostMapping("/createclient")
    public Client createClient(@RequestBody Client client) {
        return createService.createClient(client);
    }
    
    //controller to create task
    @PostMapping("/createtask")
	public Task createTask(@RequestBody Task task) {
		return createService.createTask(task);
	}
    
  
    
}
