package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.Task;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LoginRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class CreateService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LoginRepository loginRepository;
    

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ClientRepository clientRepository;
    
    private TaskRepository taskRepository;

  
	@Transactional
	public Employee saveEmployee(Employee employee) {
		// Check if login is null
		Login login = employee.getLogin();
		if (login == null) {
			login = new Login();
			employee.setLogin(login);
		}

		// Generate a random password if it's empty
		login.setPassword(PasswordGenerator.generateRandomPassword(10)); // 10 is the length of the password
		

		// Save the login entity and retrieve the saved entity (with the generated
		// loginId)
		login = loginRepository.save(login);

		// Set the loginId in the employee entity
		employee.setLoginId(login.getLoginid());

		// Save the employee entity and return the saved employee
		return employeeRepository.save(employee);
	}
    
    
    // Method to create a project
    @Transactional
    public Project createProject(Project project) {
        if (project.getAssignedTo() == 0) {
            project.setStatus("Unassigned");
        } else {
            project.setStatus("Pending");
        }
        return projectRepository.save(project);
    }
    
    // Method to create a client
    @Transactional 
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
    
    //method to create task 
    @Transactional
	public Task createTask(Task task) {
		return taskRepository.save(task);
	}
 
   
    
   
}

