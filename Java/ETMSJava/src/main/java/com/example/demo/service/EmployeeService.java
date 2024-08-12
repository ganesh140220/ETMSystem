package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Task;
import com.example.demo.entities.TaskProgress;
import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.QueryRepository;
import com.example.demo.repository.SolutionRepository;
import com.example.demo.repository.TaskProgressRepository;

@Service
public class EmployeeService {

    @Autowired
    TaskRepository taskRepository;
    
    @Autowired
    EmployeeRepository employeeRepository;
    
    @Autowired
    QueryRepository queryRepository;
    
    @Autowired
    SolutionRepository solutionRepository;
    

    @Autowired
    private TaskProgressRepository taskProgressRepository;

    // Retrieve tasks assigned to a specific employee
    public List<Task> getTasksByEmployeeId(int employeeId) {
        return taskRepository.findByAssignedTo(employeeId);
    }
    
    // Retrieve employee details by employee ID
    public Employee getEmployeeDetailsbyId(int employeeID) {
        return employeeRepository.findById(employeeID).orElse(null);
    }
    
    
    
    
//
//    // Update the status of a specific task
//    public void updateTaskStatus(int taskId, String status) {
//        Optional<Task> taskOpt = taskRepository.findById(taskId);
//        if (taskOpt.isPresent()) {
//            Task task = taskOpt.get();
//            task.setStatus(status);
//            taskRepository.save(task);
//        }
//    }

    
    
    
    // Create a query for a specific task
    public void createTaskQuery(int taskId, Query query) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            query.setTask(task);  // Associate the query with the task
            queryRepository.save(query);
        }
    }

    // Retrieve a solution for a specific query by query ID
    public List<Solution> getSolutionsByQueryId(int queryId) {
        return solutionRepository.findByQueryId(queryId);
    }

    
    
    // Update the progress of a specific task
 


    // Update Task Progress and task status
    public TaskProgress updateTask(int taskId, float workDonePercent, String updateDate, String description) {
        // Retrieve the Task by its ID
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();

            // Update the task status based on work done percentage
            if (workDonePercent > 0 && workDonePercent < 100) {
                task.setStatus("In Progress");
            } else if (workDonePercent == 100) {
                task.setStatus("Completed");
            }

            // Save the updated Task entity
            taskRepository.save(task);

            // Retrieve the list of TaskProgress by the taskId
            List<TaskProgress> taskProgressList = taskProgressRepository.findByTaskId(taskId);
            if (!taskProgressList.isEmpty()) {
                // Get the most recent TaskProgress (for simplicity, assuming the last in the list)
                TaskProgress taskProgress = taskProgressList.get(taskProgressList.size() - 1);

                // Update the work done percentage and date in TaskProgress
                taskProgress.setWorkDonePercent(workDonePercent);
                taskProgress.setUpdateDate(updateDate);
                taskProgress.setDescription(description);

                // Save the updated TaskProgress entity
                return taskProgressRepository.save(taskProgress);
            }
        }
        return null; // Handle the case where the task or task progress is not found
    }
    
}
