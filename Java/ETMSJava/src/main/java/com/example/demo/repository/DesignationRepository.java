package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Designation;
import com.example.demo.entities.Employee;

public interface DesignationRepository extends JpaRepository<Designation, Integer> {

}
