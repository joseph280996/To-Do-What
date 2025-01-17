package com.api.todolist.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.api.todolist.Task;
import com.api.todolist.exceptions.TaskNotFoundException;
import com.api.todolist.jpa.TaskJpaRepo;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class TaskController {
	@Autowired
	private TaskJpaRepo taskrepo;
	
	@PostMapping(path="/tasks")
	public @ResponseBody Task newTask(@Valid @RequestBody Task newTask) {
		if(newTask.getContent() == null) newTask.setContent("N/A");
		return taskrepo.save(newTask);
	}
	
	@GetMapping(path="/tasks")
	public @ResponseBody List<Task> getAll(){
		return taskrepo.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/tasks/{userId}")
	public @ResponseBody List<Task> getAllByUserId(@PathVariable String userId){
		return taskrepo.findAllByUserId(userId);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/tasks/task/{id}")
	public @ResponseBody Task getTaskById(@PathVariable Integer id) {
		return taskrepo.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path="/tasks/task/{id}")
	public @ResponseBody Task EditTask (@RequestBody Task newTaskContent, @PathVariable Integer id) {
		return taskrepo.findById(id)
				.map(task -> {
			if(task.getUserId().equals(newTaskContent.getUserId()))
			{
				task.setTitle(newTaskContent.getTitle());
				task.setContent(newTaskContent.getContent());
				task.setDate(newTaskContent.getDate());
				return taskrepo.save(task);
			}
			newTaskContent.setId(id);
			return taskrepo.save(newTaskContent);
		}).orElseGet(() -> {
			newTaskContent.setId(id);
			return taskrepo.save(newTaskContent);
		});
	}
	
	@CrossOrigin(origins = "*")
	@DeleteMapping("/tasks/task/{id}")
	public void deleteTask (@PathVariable Integer id) {
		taskrepo.deleteById(id);
	}
}
