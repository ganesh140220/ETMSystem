package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dummyentitiy.EmployeeDto;
import com.example.demo.dummyentitiy.LoginDTO;
import com.example.demo.dummyentitiy.ProjectDTO;
import com.example.demo.dummyentitiy.TeamMemberDTO;
import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.TeamMember;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LoginRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TeamMemberRepository;

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
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private TeamMemberRepository teamMemberRepository;
    
//    @Autowired
//    JavaMailSender Sender;

  
//	@Transactional
//	public Employee saveEmployee(Employee employee) {
//		// Check if login is null
//		Login login = employee.getLogin();
//		if (login == null) {
//			login = new Login();
//			employee.setLogin(login);
//		}
//
//		// Generate a random password if it's empty
//		login.setPassword(PasswordGenerator.generateRandomPassword(10)); // 10 is the length of the password
//		
//
//		// Save the login entity and retrieve the saved entity (with the generated
//		// loginId)
//		login = loginRepository.save(login);
//
//		// Set the loginId in the employee entity
//		employee.setLoginId(login.getLoginid());
//
//		// Save the employee entity and return the saved employee
//		return employeeRepository.save(employee);
//	}
    
	@Transactional
    public EmployeeDto saveEmployee(EmployeeDto employeeDTO) {
        // Create an Employee entity from the DTO
        Employee employee = new Employee();
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmailId(employeeDTO.getEmailId());
        employee.setContactNo(employeeDTO.getContactNo());
        employee.setAddress(employeeDTO.getAddress());
        employee.setDesigId(employeeDTO.getDesigId());

        // Handle Login information
        LoginDTO loginDTO = employeeDTO.getLogin();
        Login login = new Login();
        if (loginDTO != null) {
            login.setUsername(loginDTO.getUsername());
            // Generate a random password if it's empty
            if (loginDTO.getPassword() == null || loginDTO.getPassword().isEmpty()) {
                login.setPassword(PasswordGenerator.generateRandomPassword(10)); // 10 is the length of the password
            } else {
                login.setPassword(loginDTO.getPassword());
            }
            login.setRoleid(loginDTO.getRoleid());
            login.setActive(loginDTO.getActive());

            // Save the login entity
            login = loginRepository.save(login);
            employee.setLoginId(login.getLoginid());
            employee.setLogin(login);
        }

        // Save the employee entity
        Employee savedEmployee = employeeRepository.save(employee);

        // Convert the saved Employee entity back to EmployeeDTO
        EmployeeDto savedEmployeeDTO = new EmployeeDto();
        savedEmployeeDTO.setFirstName(savedEmployee.getFirstName());
        savedEmployeeDTO.setLastName(savedEmployee.getLastName());
        savedEmployeeDTO.setEmailId(savedEmployee.getEmailId());
        savedEmployeeDTO.setContactNo(savedEmployee.getContactNo());
        savedEmployeeDTO.setAddress(savedEmployee.getAddress());
        savedEmployeeDTO.setDesigId(savedEmployee.getDesigId());

        // Convert the saved Login entity back to LoginDTO
        if (savedEmployee.getLogin() != null) {
            Login savedLogin = savedEmployee.getLogin();
            LoginDTO savedLoginDTO = new LoginDTO();
            savedLoginDTO.setUsername(savedLogin.getUsername());
            savedLoginDTO.setPassword(savedLogin.getPassword());
            savedLoginDTO.setRoleid(savedLogin.getRoleid());
            savedLoginDTO.setActive(savedLogin.getActive());
            savedEmployeeDTO.setLogin(savedLoginDTO);
        }

//        SimpleMailMessage mailMsg = new SimpleMailMessage();
//        //send mail to the employee
//        mailMsg.setFrom("flyhigh21.2020@gmail.com");
//        mailMsg.setTo(savedEmployee.getEmailId());
//        mailMsg.setSubject("Welcome to the Company");
//        mailMsg.setText("Welcome to the Company. Your login credentials are: \nUsername: " + savedEmployee.getLogin().getUsername() + "\nPassword: " + savedEmployee.getLogin().getPassword());
//        Sender.send(mailMsg);
        return savedEmployeeDTO;
        
        
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
    
    
    //method to create project 
    @Transactional
    public void createProjectAndTeamMember(ProjectDTO projectDTO, TeamMemberDTO teamMemberDTO) {
        // Create and save the Project
        Project project = new Project();
        project.setProjectTitle(projectDTO.getProjectTitle());
        project.setStatus(projectDTO.getStatus());
        project.setCreatedDate(projectDTO.getCreatedDate());
        project.setDescription(projectDTO.getDescription());
        project.setCreatedBy(projectDTO.getCreatedBy());

        // Handle the assignedTo field: set it to null if it is not set
        Integer assignedTo = projectDTO.getAssignedTo();
        project.setAssignedTo((assignedTo != null && assignedTo > 0) ? assignedTo : null);

        project.setClientId(projectDTO.getClientId());
        project.setCompletedDate(projectDTO.getCompletedDate()); // if applicable

        Project savedProject = projectRepository.save(project);

        // Create and save the TeamMember
        TeamMember teamMember = new TeamMember();
        teamMember.setEmpId(teamMemberDTO.getEmpId());
        teamMember.setProjectId(savedProject.getId()); // Set the projectId to the ID of the saved project

        teamMemberRepository.save(teamMember);
    }
 
    
    //method team member
    

    @Transactional
    public void createTeamMembers(List<TeamMemberDTO> teamMembersDTO) {
        for (TeamMemberDTO teamMemberDTO : teamMembersDTO) {
            TeamMember teamMember = new TeamMember();
            teamMember.setEmpId(teamMemberDTO.getEmpId());
            teamMember.setProjectId(teamMemberDTO.getProjectId());
            teamMemberRepository.save(teamMember);

            // Log or debug to verify the correct values are being set
            System.out.println("Saving TeamMember with Project ID: " + teamMember.getProjectId());
        }
    }

   
    
   
}

