package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TeamMemberRepository;

import jakarta.transaction.Transactional;

@Service
public class DeleteService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Transactional
    public void deleteEmployee(int empId) {
        // Delete related team members
        teamMemberRepository.deleteByEmpId(empId);
        // Delete the employee
        employeeRepository.deleteById(empId);
    }

    @Transactional
    public void deleteProject(int projectId) {
        // Delete related team members
        teamMemberRepository.deleteByProjectId(projectId);
        
        // Optionally, handle related entities if needed

        // Delete the project
        projectRepository.deleteById(projectId);
    }
}


