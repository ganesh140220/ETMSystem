package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.TaskProgress;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskProgressRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskProgressRepository taskProgressRepository;

    // Update Task Progress
    public Task updateTaskProgress(TaskProgress taskProgress) {
    	  SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
          
          // Get the current date and time
          Date date = new Date();
          
          // Format the date
          String formattedDate = formatter.format(date);
        // Fetch the task by taskId
        Task task = taskRepository.findById(taskProgress.getTaskId()).orElse(null);
       
        
        if (taskProgress.getWorkDonePercent()==100) {
        	task.setStatus("completed");
        	task.setCompletedDate(formattedDate);
        }
        if (task != null) {
            // Update the TaskProgress entity
            taskProgressRepository.save(taskProgress);

            // Update the Work_done_percentage in the Task entity
            task.updateStatusBasedOnProgress(taskProgress.getWorkDonePercent());
            taskRepository.save(task);

            Task task1 = taskRepository.findById(taskProgress.getTaskId()).orElse(null);
            Project p=projectRepository.findByid(task1.getProjectId());
            List<Task> alltask=p.getTasks();
            System.out.println(alltask.size());
            boolean flag=true;
            
            for (Task t : alltask) {
            	if(!t.getStatus().equals("completed")) {
            		
            		flag=false;
            		System.out.println(flag);
            		break;
            	}
    			
            	
    		}
            
           
            
            if(flag) {p.setStatus("completed");
            p.setCompletedDate(formattedDate);}
            
            projectRepository.save(p);
            return task;
        }
        return null; // Handle the case where the task is not found
    }
   
    
}
