package com.gyd.moneyCom.controller;

import javax.annotation.Resource;

import com.gyd.moneyCom.bean.User;

import com.gyd.moneyCom.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


@RestController

@RequestMapping("/user")
public class UserController {

	@Resource

	private UserService userService;

	@RequestMapping("/save")

	public String save(){

	User user =new User();

	user.setLoginName("dlei");

	user.setUserName("徐磊");

	user.setSex('男');

	user.setAge(3);

	userService.save(user);

	return"保存数据成功！";

	}

	@RequestMapping("/update")

	public String update(){

	User user =new User();

	user.setId(1);

	user.setUserName("孙悟空");

	user.setLoginName("swk");

	userService.update(user);

	return"修改成功!";

	}

	@RequestMapping("/delete")

	public String delete(){

	userService.delete(5);

	return "删除数据成功！";

	}

	@RequestMapping("/getAll")

	public Iterable<User> getAll(){

	// 查询所有的用户数据

	return userService.getAll();

	}
	
}
