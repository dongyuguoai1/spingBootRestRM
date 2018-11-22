package com.gyd.moneyCom.bean;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

@Entity

//用于标记持久化类,Spring Boot项目加载后会自动根据持久化类建表
public class User {

	/**

	* 使用@Id指定主键. 使用代码@GeneratedValue(strategy=GenerationType.AUTO)

	* 指定主键的生成策略,mysql默认的是自增长。

	*

	*/
	@Id

	@GeneratedValue(strategy =GenerationType.AUTO)

	private int id;// 主键.

	private String userName;// 姓名. cat_name

	private String loginName;

	private char sex;// 性别

	private int age;// 年龄

	public int getId(){

	return id;

	}

	public void setId(int id){

	this.id = id;

	}

	public String getUserName(){

	return userName;

	}

	public void setUserName(String userName){

	this.userName = userName;

	}

	public String getLoginName(){

	return loginName;

	}

	public void setLoginName(String loginName){

	this.loginName = loginName;

	}

	public char getSex(){

	return sex;

	}

	public void setSex(char sex){

	this.sex = sex;

	}

	public int getAge(){

	return age;

	}

	public void setAge(int age){

	this.age = age;

	}
	
	
	
}
