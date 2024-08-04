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
@Table(name = "designation")

public class Designation {

    @Id
    private int desigId;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "desig", cascade = CascadeType.ALL)
    private List<Employee> employees;

   

    
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

