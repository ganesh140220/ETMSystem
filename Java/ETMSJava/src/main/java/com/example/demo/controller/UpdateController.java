package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.TeamMember;
import com.example.demo.service.UpdateService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UpdateController {

    private final UpdateService updateService;

    @Autowired
    public UpdateController(UpdateService updateService) {
        this.updateService = updateService;
    }

    @PutMapping("/assignProjectToManager")
    public ResponseEntity<String> assignProjectToManager(@RequestBody TeamMember teamMember) {
        try {
            updateService.assignProjectToManager(teamMember.getEmpId(), teamMember.getProjectId());
            return ResponseEntity.ok("Project assigned to manager successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
