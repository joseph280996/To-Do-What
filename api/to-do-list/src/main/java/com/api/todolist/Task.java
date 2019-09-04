package com.api.todolist;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


@Entity
public class Task {
	@Id
	@GeneratedValue
	private Integer id;
	@NotNull
	private String title;
	private String content;
	@NotNull
	private Date date;
	@NotNull
	private String userId;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Task(){}
	
	public Task(int id, String title) {
		this.id = id;
		this.title = title;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", content:"+ content + ", date=" + date + "]";
	}
	
	
}
