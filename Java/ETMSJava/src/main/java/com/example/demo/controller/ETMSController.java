package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LoginRepository;

@CrossOrigin(origins= {"http://localhost:3000"})
@RestController
public class ETMSController {
	
	@Autowired
	LoginRepository LR;
	
	@GetMapping("path")
	public List<Login> getAllEmp(@RequestParam String id) {
		System.out.println("Hello");
		return LR.findAll();
	}
	
	
}
