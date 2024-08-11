package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.entities.TeamMember;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.QueryRepository;
import com.example.demo.repository.SolutionRepository;
import com.example.demo.repository.TeamMemberRepository;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository; // Ensure this repository exists

    // Create Associate
    public Employee createAssociate(Employee employee) {
        return employeeRepository.save(employee);
    }

    // View Associate
    public List<Employee> getAllAssociates() {
        return employeeRepository.findAll();
    }

    public Employee getAssociateById(int associateId) {
        return employeeRepository.findById(associateId).orElse(null);
    }

    // Create Team Member
    public TeamMember createTeamMember(int employeeId, int projectId) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        Project project = projectRepository.findById(projectId).orElse(null);
        if (employee != null && project != null) {
            TeamMember teamMember = new TeamMember();
            teamMember.setEmpId(employeeId);
            teamMember.setProjectId(projectId);
            teamMember.setEmployee(employee);
            teamMember.setProject(project);
            return teamMemberRepository.save(teamMember);
        }
        return null; // Handle this case appropriately
    }

    // Create Task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Check Task Progress
    public Task getTaskById(int taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    // View queries related to a specific task
    public List<Query> getQueriesByTaskId(int taskId) {
        return queryRepository.findByTaskId(taskId);
    }

    // Provide a solution to a query
    public Solution provideSolutionToQuery(int queryId, Solution solution) {
        Query query = queryRepository.findById(queryId).orElse(null);
        if (query != null) {
            solution.setQid(queryId);
            solution.setQuery(query);
            return solutionRepository.save(solution);
        }
        return null; // or throw an appropriate exception
    }

    // View and Edit Profile
    public Employee getProfileDetails(int employeeId) {
        return employeeRepository.findById(employeeId).orElse(null);
    }

    public Employee updateProfile(int employeeId, Employee updatedEmployee) {
        if (employeeRepository.existsById(employeeId)) {
            updatedEmployee.setId(employeeId);
            return employeeRepository.save(updatedEmployee);
        }
        return null; // or throw an appropriate exception
    }
}
