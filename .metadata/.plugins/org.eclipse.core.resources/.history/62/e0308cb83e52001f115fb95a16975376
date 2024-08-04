package com.example.demo.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.List;
import java.util.Objects;

import jakarta.persistence.*;
import jakarta.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "client")

public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String emailId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String contactNo;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Project> projects;


    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(id, emailId, name, contactNo);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return id == client.id &&
               Objects.equals(emailId, client.emailId) &&
               Objects.equals(name, client.name) &&
               Objects.equals(contactNo, client.contactNo);
    }
}

