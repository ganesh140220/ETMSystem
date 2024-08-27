package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Solution;
import com.example.demo.service.SolutionService;

@RestController
@RequestMapping("/solutions")
@CrossOrigin(origins  = "http://localhost:3000")
public class SolutionController {

    @Autowired
    private SolutionService solutionService;

    @PostMapping
    public ResponseEntity<Solution> createSolution(@RequestBody Solution solution) {
        Solution savedSolution = solutionService.saveSolution(solution);
        return new ResponseEntity<>(savedSolution, HttpStatus.CREATED);
    }
}
