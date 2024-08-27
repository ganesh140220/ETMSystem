package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.DisableService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DisableController {

    private final DisableService disableService;
    private static final Logger logger = LoggerFactory.getLogger(DisableController.class);

    @Autowired
    public DisableController(DisableService disableService) {
        this.disableService = disableService;
    }

    // Endpoint to disable a user account
    @GetMapping("/disableLogin")
    public String disableLogin(@RequestParam(name="loginid") int loginid) {
    	disableService.disableLogin(loginid);
    	return "Done";
    	
    }

    // Endpoint to enable a user account
    @GetMapping("/enableLogin")
    public String enableLogin(@RequestParam(name="loginid") int loginid) {
    	disableService.enableLogin(loginid);
    	return "Done";
    }
}
