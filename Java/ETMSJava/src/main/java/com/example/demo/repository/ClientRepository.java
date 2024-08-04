package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;

public interface ClientRepository extends JpaRepository<Client, Integer> {

}
