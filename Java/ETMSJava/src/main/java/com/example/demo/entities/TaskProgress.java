package com.example.demo.entities;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "task_progress")
public class TaskProgress {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@Column(nullable = false)
    private String updateDate;
	
	@Column(nullable = false)
    private String description;
	
	@Column(nullable = false)
    private float workDonePercent;
	
	@Column(nullable = false)
    private int taskId;
	
	@ManyToOne
    @JoinColumn(name = "taskId", insertable = false, updatable = false)
    private Task task;

	@Override
	public int hashCode() {
		return Objects.hash(description, id, task, taskId, updateDate, workDonePercent);
	}
	
	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TaskProgress other = (TaskProgress) obj;
		return Objects.equals(description, other.description) && id == other.id && Objects.equals(task, other.task)
				&& taskId == other.taskId && Objects.equals(updateDate, other.updateDate)
				&& Float.floatToIntBits(workDonePercent) == Float.floatToIntBits(other.workDonePercent);
	}
	
	
}
