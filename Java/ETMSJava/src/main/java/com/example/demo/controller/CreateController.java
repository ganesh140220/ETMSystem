package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dummyentitiy.EmployeeDto;
import com.example.demo.dummyentitiy.ProjectDTO;
import com.example.demo.dummyentitiy.TeamMemberDTO;
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
    @Autowired
    private CreateService createService;

//    @PostMapping("/createEmployee")
//    public Employee addEmployee(@RequestBody Employee employee) {
//        return employeeService.saveEmployee(employee);
//    }
    
    @PostMapping("/createEmployee")
    public ResponseEntity<EmployeeDto> addEmployee(@RequestBody EmployeeDto employeeDto) {
        try {
            // Save the employee and get the DTO of the saved employee
            EmployeeDto savedEmployeeDto = employeeService.saveEmployee(employeeDto);

            // Return the saved employee DTO with a status of CREATED
            return new ResponseEntity<>(savedEmployeeDto, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace(); // Or use a logging framework like SLF4J
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    
    

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
    
  
    
    //controller to create project and team member
    @PostMapping("/createProject")
    public ResponseEntity<String> createProjectAndTeamMember(@RequestBody CreateProjectRequest request) {
        try {
            // Extract project and team member details from the request
            ProjectDTO projectDTO = request.getProject();
            TeamMemberDTO teamMemberDTO = request.getTeammember();

            // Call the service method to create both the project and the team member
            createService.createProjectAndTeamMember(projectDTO, teamMemberDTO);

            return new ResponseEntity<>("Project and Team Member created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return new ResponseEntity<>("Error creating project and team member", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    
}
