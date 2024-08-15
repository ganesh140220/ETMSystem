package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Task;
import com.example.demo.entities.TaskProgress;
import com.example.demo.repository.TaskProgressRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskProgressRepository taskProgressRepository;

    // Update Task Progress
    public Task updateTaskProgress(TaskProgress taskProgress) {
        // Fetch the task by taskId
        Task task = taskRepository.findById(taskProgress.getTaskId()).orElse(null);
        if (task != null) {
            // Update the TaskProgress entity
            taskProgressRepository.save(taskProgress);

            // Update the Work_done_percentage in the Task entity
            task.updateStatusBasedOnProgress(taskProgress.getWorkDonePercent());
            taskRepository.save(task);

            return task;
        }
        return null; // Handle the case where the task is not found
    }
   
    
}
