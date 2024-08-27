package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Solution;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface SolutionRepository extends JpaRepository<Solution, Integer> {
	
	 @Modifying
	    @Transactional
	    @Query("UPDATE Query q SET q.status = 'resolved' WHERE q.qid = :qid")
	    void updateQueryStatus(@Param("qid") int qid);

}
