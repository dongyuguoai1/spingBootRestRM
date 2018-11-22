package com.gyd.moneyCom.service;

import javax.annotation.Resource;

import javax.transaction.Transactional;

import com.gyd.moneyCom.bean.User;

import com.gyd.moneyCom.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service

public class UserService {
	
	@Resource

	private UserRepository userRepository;

	/**

	* save,update ,delete 方法需要绑定事务. 使用@Transactional进行事务的绑定.

	*

	* @param User

	* 保存对象

	*/

	@Transactional

	public void save(User User){

	userRepository.save(

	User);

	}

	/**

	* 根据id删除对象

	*

	* @param id

	*/

	@Transactional

	public void delete(int id){

	userRepository.delete(id);

	}

	/**

	* 查询数据

	*

	* @return

	*/

	public Iterable<User> getAll(){

	return userRepository.findAll();

	}

	/**

	* 修改用户对象数据

	*

	* @param user

	*/

	@Transactional

	public void update(User user){

	// 先根据要修改的对象id查询出对应的持久化对象

	User sessionUser = userRepository.findOne(user.getId());

	// 直接调用持久化对象的set方法修改对象的数据

	sessionUser.setUserName(user.getUserName());

	sessionUser.setLoginName(user.getLoginName());

	}

}
