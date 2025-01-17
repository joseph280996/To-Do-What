package com.api.todolist.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.api.todolist.Task;

public interface TaskJpaRepo extends JpaRepository <Task, Integer> {
	@Query(value="SELECT t FROM Task t WHERE t.userId = ?1")
	public List<Task> findAllByUserId(String userId);
}
