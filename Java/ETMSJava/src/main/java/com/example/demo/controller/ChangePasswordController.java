package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dummyentitiy.ChangePasswordRequest;
import com.example.demo.service.ChangePasswordService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChangePasswordController {

    private final ChangePasswordService changePasswordService;

    @Autowired
    public ChangePasswordController(ChangePasswordService changePasswordService) {
        this.changePasswordService = changePasswordService;
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            changePasswordService.changePassword(
                    changePasswordRequest.getLoginId(),
                    changePasswordRequest.getOldPassword(),
                    changePasswordRequest.getNewPassword()
            );
            return ResponseEntity.ok("Password changed successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
