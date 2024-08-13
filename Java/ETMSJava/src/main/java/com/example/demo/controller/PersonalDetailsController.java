package com.example.demo.controller;

import com.example.demo.entities.Employee;
import com.example.demo.service.PersonalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/personalDetails")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalDetailsController {

    @Autowired
    private  PersonalDetailsService employeeService;

    @PutMapping("/{id}")
    public Employee updatePersonalDetails(@PathVariable int id, @RequestBody Employee employee) {
        return employeeService.updatePersonalDetails(id, employee);
    }
}
