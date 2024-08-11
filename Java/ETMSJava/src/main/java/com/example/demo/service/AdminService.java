package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Project;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LoginRepository;
import com.example.demo.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private LoginRepository loginRepository;

    // Create Employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Create Client
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    // Create Project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // View Employee
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(int employeeId) {
        return employeeRepository.findById(employeeId).orElse(null);
    }

    // View Client
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(int clientId) {
        return clientRepository.findById(clientId).orElse(null);
    }

    // View Project
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(int projectId) {
        return projectRepository.findById(projectId).orElse(null);
    }

    // View and Change Profile
    public Employee getProfileDetails(int employeeId) {
        return employeeRepository.findById(employeeId).orElse(null);
    }

    public Employee updateProfile(int employeeId, Employee updatedEmployee) {
        if (employeeRepository.existsById(employeeId)) {
            updatedEmployee.setId(employeeId);
            return employeeRepository.save(updatedEmployee);
        }
        return null;
    }

    public boolean changePassword(int loginId, String newPassword) {
        Optional<Login> loginOpt = loginRepository.findById(loginId);
        if (loginOpt.isPresent()) {
            Login login = loginOpt.get();
            login.setPassword(newPassword);  // Update the password in the Login table
            loginRepository.save(login);
            return true;
        }
        return false;
    }
}
