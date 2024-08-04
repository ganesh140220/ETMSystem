package com.example.demo.entities;


import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
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

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int loginId;

    @Column(nullable = false)
    private int desigId;

    @ManyToOne
    @JoinColumn(name = "desigId", insertable = false, updatable = false)
    private Designation desig;

    @OneToOne
    @JoinColumn(name = "loginId", insertable = false, updatable = false)
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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public int getContactNo() {
        return contactNo;
    }

    public void setContactNo(int contactNo) {
        this.contactNo = contactNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getLoginId() {
        return loginId;
    }

    public void setLoginId(int loginId) {
        this.loginId = loginId;
    }

    public int getDesigId() {
        return desigId;
    }

    public void setDesigId(int desigId) {
        this.desigId = desigId;
    }

    public Designation getDesig() {
        return desig;
    }

    public void setDesig(Designation desig) {
        this.desig = desig;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public List<Project> getProjectAssignedToNavigations() {
        return projectAssignedToNavigations;
    }

    public void setProjectAssignedToNavigations(List<Project> projectAssignedToNavigations) {
        this.projectAssignedToNavigations = projectAssignedToNavigations;
    }

    public List<Project> getProjectCreatedByNavigations() {
        return projectCreatedByNavigations;
    }

    public void setProjectCreatedByNavigations(List<Project> projectCreatedByNavigations) {
        this.projectCreatedByNavigations = projectCreatedByNavigations;
    }

    public List<Query> getQueries() {
        return queries;
    }

    public void setQueries(List<Query> queries) {
        this.queries = queries;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public TeamMember getTeamMember() {
        return teamMember;
    }

    public void setTeamMember(TeamMember teamMember) {
        this.teamMember = teamMember;
    }

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

