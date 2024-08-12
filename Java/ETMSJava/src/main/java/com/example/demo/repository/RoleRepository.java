package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Role;

@Transactional
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
