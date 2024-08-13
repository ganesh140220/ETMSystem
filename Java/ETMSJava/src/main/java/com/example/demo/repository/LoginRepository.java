package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Role;

import jakarta.transaction.Transactional;


@Transactional
@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {
    
}
