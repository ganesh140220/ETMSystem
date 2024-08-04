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
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private String dueDate;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int assignedTo;

    @Column(nullable = false)
    private int projectId;

    @ManyToOne
    @JoinColumn(name = "assignedTo", insertable = false, updatable = false)
    private Employee assignedToNavigation;

    @ManyToOne
    @JoinColumn(name = "projectId", insertable = false, updatable = false)
    private Project project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Query> queries;
    
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<TaskProgress> taskProgress;


    @Override
	public int hashCode() {
		return Objects.hash(assignedTo, assignedToNavigation, createdDate, description, dueDate, id, project, projectId,
				queries, status, taskProgress, title);
	}

    @Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		return assignedTo == other.assignedTo && Objects.equals(assignedToNavigation, other.assignedToNavigation)
				&& Objects.equals(createdDate, other.createdDate) && Objects.equals(description, other.description)
				&& Objects.equals(dueDate, other.dueDate) && id == other.id && Objects.equals(project, other.project)
				&& projectId == other.projectId && Objects.equals(queries, other.queries)
				&& Objects.equals(status, other.status) && Objects.equals(taskProgress, other.taskProgress)
				&& Objects.equals(title, other.title);
	}
}

