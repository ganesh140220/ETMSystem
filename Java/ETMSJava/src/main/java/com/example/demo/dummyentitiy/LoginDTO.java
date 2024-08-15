package com.example.demo.dummyentitiy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {

    private int loginid;
    private String username;
    private String password;
    private int roleid;
    private int active;
}
