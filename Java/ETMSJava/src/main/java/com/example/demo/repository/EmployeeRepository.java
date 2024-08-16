package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;

import jakarta.transaction.Transactional;
import java.util.List;


@Transactional
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
Employee findByLoginId(int loginId);
}
