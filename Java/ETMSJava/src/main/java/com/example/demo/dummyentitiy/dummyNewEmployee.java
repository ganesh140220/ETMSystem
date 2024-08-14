package com.example.demo.dummyentitiy;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class dummyNewEmployee {
	
	
    private int id;

   
    private String firstName;

   
    private String lastName;

    @Column(nullable = false)
    private String emailId;

    @Column(nullable = false)
    private int contactNo;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int loginId;

    @Column(nullable = false)
    private int desigId;
	
	
	
}
