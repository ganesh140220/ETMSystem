package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.repository.LoginRepository;

@Service
public class DisableService {

    private final LoginRepository loginRepository;

    @Autowired
    public DisableService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    // Method to disable a user account
    public void disableLogin(int loginid) {
       Login l= loginRepository.findByLoginid(loginid);
       l.setActive(0);
       loginRepository.save(l);
    }

    // Method to enable a user account
    public void enableLogin(int loginid) {
    	Login l= loginRepository.findByLoginid(loginid);
        l.setActive(1);
        loginRepository.save(l);
    }
}
