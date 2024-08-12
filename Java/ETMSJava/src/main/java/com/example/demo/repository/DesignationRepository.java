package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Designation;

@Transactional
@Repository
public interface DesignationRepository extends JpaRepository<Designation, Integer> {

}
