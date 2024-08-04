package com.example.demo.entities;
import jakarta.persistence.*;
import java.util.Objects;

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

	    // Getters and Setters
	    public int getLoginid() {
	        return loginid;
	    }

	    public void setLoginid(int loginid) {
	        this.loginid = loginid;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public void setUsername(String username) {
	        this.username = username;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public int getRoleid() {
	        return roleid;
	    }

	    public void setRoleid(int roleid) {
	        this.roleid = roleid;
	    }

	    public int getActive() {
	        return active;
	    }

	    public void setActive(int active) {
	        this.active = active;
	    }

	    public Employee getEmployee() {
	        return employee;
	    }

	    public void setEmployee(Employee employee) {
	        this.employee = employee;
	    }

	    public Role getRole() {
	        return role;
	    }

	    public void setRole(Role role) {
	        this.role = role;
	    }

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



