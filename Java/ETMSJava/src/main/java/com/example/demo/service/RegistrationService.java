package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;

@Service
public class RegistrationService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee registerEmployee(Employee employee) {
        
        validateEmployee(employee);

        return employeeRepository.save(employee);
    }

    private void validateEmployee(Employee employee) {
        if (employee.getFirstName() == null || employee.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if (employee.getLastName() == null || employee.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        if (employee.getEmailId() == null || !employee.getEmailId().contains("@")) {
            throw new IllegalArgumentException("Invalid email address");
        }
        if (employee.getContactNo() <= 0) {
            throw new IllegalArgumentException("Invalid contact number");
        }
        if (employee.getAddress() == null || employee.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be empty");
        }
       
    }
}
