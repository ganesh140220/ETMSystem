package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Login;
import com.example.demo.repository.LoginRepository;

@Service
public class ChangePasswordService {

    private final LoginRepository loginRepository;
    private final CustomStringEncoder customStringEncoder;

    @Autowired
    public ChangePasswordService(LoginRepository loginRepository, CustomStringEncoder customStringEncoder) {
        this.loginRepository = loginRepository;
        this.customStringEncoder = customStringEncoder;
    }

    @Transactional
    public void changePassword(int loginId, String oldPassword, String newPassword) {
        // Fetch login record by loginId
        Login login = loginRepository.findById(loginId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + loginId));

        // Check if the old password matches
        if (customStringEncoder.matches(oldPassword, login.getPassword())) {
            // Encode the new password and update it
            login.setPassword(customStringEncoder.encode(newPassword));
            loginRepository.save(login);
        } else {
            throw new RuntimeException("Old password does not match.");
        }
    }
}
