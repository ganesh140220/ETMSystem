package com.example.demo.service;

import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonalDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee updatePersonalDetails(int id, Employee updatedEmployee) {
        Optional<Employee> existingEmployee = employeeRepository.findById(id);

        if (existingEmployee.isPresent()) {
            Employee employee = existingEmployee.get();
            // Update all fields with the data from the updatedEmployee object
            employee.setFirstName(updatedEmployee.getFirstName());
            employee.setLastName(updatedEmployee.getLastName());
            employee.setEmailId(updatedEmployee.getEmailId());
            employee.setContactNo(updatedEmployee.getContactNo());
            employee.setAddress(updatedEmployee.getAddress());
            employee.setLoginId(updatedEmployee.getLoginId());
            employee.setDesigId(updatedEmployee.getDesigId());
            // Save updated employee back to the database
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }
}
