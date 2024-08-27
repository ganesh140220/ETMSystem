package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Solution;
import com.example.demo.repository.SolutionRepository;

@Service
public class SolutionService {

    @Autowired
    private SolutionRepository solutionRepository;
    
    public Solution saveSolution(Solution solution) {
        Solution savedSolution = solutionRepository.save(solution);
        solutionRepository.updateQueryStatus(solution.getQid());
        return savedSolution;
    }
}
