package com.example.demo.entities;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "login")
@Entity
public class Login {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int loginid;

	    @Column(nullable = false)
	    private String username;

	    @Column(nullable = false)
	    private String password;

	    @Column(nullable = false)
	    private int roleid;

	    @Column(nullable = false)
	    private int active;

	    @OneToOne(mappedBy = "login", cascade = CascadeType.ALL)
	    private Employee employee;

	    @ManyToOne
	    @JoinColumn(name = "roleid", insertable = false, updatable = false)
	    private Role role;


	  
	    // hashCode and equals methods
	    @Override
	    public int hashCode() {
	        return Objects.hash(loginid, username, password, roleid, active);
	    }

	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        Login login = (Login) o;
	        return loginid == login.loginid &&
	               roleid == login.roleid &&
	               active == login.active &&
	               Objects.equals(username, login.username) &&
	               Objects.equals(password, login.password);
	    }
	}



