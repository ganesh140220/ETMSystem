package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.DeleteService;

@RestController
@CrossOrigin(origins  = "http://localhost:3000")
public class DeleteController {

    private final DeleteService deleteService;

    @Autowired
    public DeleteController(DeleteService deleteService) {
        this.deleteService = deleteService;
    }

    @DeleteMapping("/deleteEmployee/{empId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int empId) {
        deleteService.deleteEmployee(empId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable int projectId) {
        deleteService.deleteProject(projectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


