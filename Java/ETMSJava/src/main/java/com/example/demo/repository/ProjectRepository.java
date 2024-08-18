package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Project;


import jakarta.transaction.Transactional;


@Transactional
@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	//assign project to manager
	@Modifying
	@Query("UPDATE Project p SET p.assignedTo = :empId, p.status = 'Pending' WHERE p.id = :projectId")
	int updateAssignedTo(@Param("empId") int empId, @Param("projectId") int projectId);
	
	Project findByid(int projectId);
}
