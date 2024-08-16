package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.TeamMember;

import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface TeamMemberRepository extends JpaRepository<TeamMember, Integer> {

	 void deleteByEmpId(int empId);
	    void deleteByProjectId(int projectId);
}
