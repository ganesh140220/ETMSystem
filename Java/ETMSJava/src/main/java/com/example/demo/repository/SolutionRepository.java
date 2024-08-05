package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Solution;

public interface SolutionRepository extends JpaRepository<Solution, Integer> {

}
