package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Task;
import com.example.demo.entities.TaskProgress;
import com.example.demo.service.TaskService;

@RestController
@RequestMapping("/api/task-progress")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskProgressController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<String> createOrUpdateTaskProgress(@RequestBody TaskProgress taskProgress) {
        Task updatedTask = taskService.updateTaskProgress(taskProgress);
        if (updatedTask != null) {
            return new ResponseEntity<>("Task progress updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update task progress.", HttpStatus.NOT_FOUND);
        }
    }
}
