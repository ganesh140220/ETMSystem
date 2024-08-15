package com.example.demo.controller;

import com.example.demo.dummyentitiy.ProjectDTO;
import com.example.demo.dummyentitiy.TeamMemberDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProjectRequest {
    private ProjectDTO project;
    private TeamMemberDTO teammember;
}
