package com.example.demo.dummyentitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmployeeDto {
	
	
	 private int id;
	    private String firstName;
	    private String lastName;
	    private String emailId;
	    private long contactNo;
	    private String address;
	    private int loginId;
	    private int desigId;
	    private LoginDTO login;
	
	
}
