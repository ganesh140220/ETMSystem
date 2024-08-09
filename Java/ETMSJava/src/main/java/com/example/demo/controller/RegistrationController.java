package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Employee;
import com.example.demo.service.RegistrationService;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/admin")
public class RegistrationController {

    @Autowired
    private RegistrationService employeeService;

    @PostMapping("/register")
    public ResponseEntity<Employee> registerEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.registerEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); 
        }
    }
}
