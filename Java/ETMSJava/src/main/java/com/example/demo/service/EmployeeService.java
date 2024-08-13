package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Task;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.QueryRepository;
import com.example.demo.repository.SolutionRepository;

@Service
public class EmployeeService {
	
	EmployeeRepository  employeerepo;
	
	
	public List<Employee> viewEmployee(){
		return  employeerepo.findAll();
	}


    
}
