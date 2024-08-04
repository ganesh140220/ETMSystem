package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Query;

public interface QueryRepository extends JpaRepository<Query, Integer> {

}
