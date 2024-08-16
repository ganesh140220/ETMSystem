package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.TeamMember;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TeamMemberRepository;

@Service
public class UpdateService {

    private final ProjectRepository projectRepository;
    private final TeamMemberRepository teamMemberRepository;

    @Autowired
    public UpdateService(ProjectRepository projectRepository, TeamMemberRepository teamMemberRepository) {
        this.projectRepository = projectRepository;
        this.teamMemberRepository = teamMemberRepository;
    }

    // Assign project to manager
    public void assignProjectToManager(int empId, int projectId) {
        // Update the assignedTo field in Project
        projectRepository.updateAssignedTo(empId, projectId);

        // Create a new TeamMember instance
        TeamMember teamMember = new TeamMember();
        teamMember.setEmpId(empId);
        teamMember.setProjectId(projectId);
        

        // Save TeamMember to the database
        teamMemberRepository.save(teamMember);
    }
}
