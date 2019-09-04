package com.api.todolist.exceptions;

public class TaskNotFoundException extends RuntimeException {
	
	public TaskNotFoundException(Integer id){
		super("Could not find task " + id);
	}

}
