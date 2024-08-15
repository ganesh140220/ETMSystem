package com.example.demo.dummyentitiy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDTO {
    private int id;
    private String projectTitle;
    private String description;
    private int assignedTo;
    private int clientId;
    private int createdBy;
    private String createdDate;
    private String status;
    private String completedDate;
}