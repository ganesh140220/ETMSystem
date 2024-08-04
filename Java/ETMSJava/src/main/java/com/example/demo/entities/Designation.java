package com.example.demo.entities;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int desigId;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "desig", cascade = CascadeType.ALL)
    private List<Employee> employees;

    // Getters and Setters
    public int getDesigId() {
        return desigId;
    }

    public void setDesigId(int desigId) {
        this.desigId = desigId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(desigId, name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Designation that = (Designation) o;
        return desigId == that.desigId &&
               Objects.equals(name, that.name);
    }
}

