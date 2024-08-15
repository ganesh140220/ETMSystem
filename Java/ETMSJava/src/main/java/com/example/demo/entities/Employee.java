package com.example.demo.entities;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.List;
import java.util.Objects;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee")

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String emailId;

    @Column(nullable = false)
    private int contactNo;

    @Column
    private String address;

    @Column(nullable = false)
    private int loginId;

    @Column(nullable = false)
    private int desigId;

    @ManyToOne
    @JoinColumn(name = "desigId", insertable = false, updatable = false)
    private Designation desig;

    @OneToOne
    @JoinColumn(name = "loginId", insertable = false, updatable = false,unique = true)
    private Login login;

    @OneToMany(mappedBy = "assignedToNavigation", cascade = CascadeType.ALL)
    private List<Project> projectAssignedToNavigations;

    @OneToMany(mappedBy = "createdByNavigation", cascade = CascadeType.ALL)
    private List<Project> projectCreatedByNavigations;

    @OneToMany(mappedBy = "raisedByNavigation", cascade = CascadeType.ALL)
    private List<Query> queries;

    @OneToMany(mappedBy = "solvedByNavigation", cascade = CascadeType.ALL)
    private List<Solution> solutions;

    @OneToMany(mappedBy = "assignedToNavigation", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private TeamMember teamMember;


   
    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, emailId, contactNo, address, loginId, desigId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id == employee.id &&
               contactNo == employee.contactNo &&
               loginId == employee.loginId &&
               desigId == employee.desigId &&
               Objects.equals(firstName, employee.firstName) &&
               Objects.equals(lastName, employee.lastName) &&
               Objects.equals(emailId, employee.emailId) &&
               Objects.equals(address, employee.address);
    }
}

