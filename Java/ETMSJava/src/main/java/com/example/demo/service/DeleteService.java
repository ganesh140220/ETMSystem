package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.EmployeeRepository;


@Service
public class DeleteService {
	 @Autowired
	    private EmployeeRepository employeeRepository;

	    

	    public void deleteEmployee(int id) {
	        if (!employeeRepository.existsById(id)) {
	            throw new RuntimeException("Employee not found with id: " + id);
	        }
	        employeeRepository.deleteById(id);
	    }

}
