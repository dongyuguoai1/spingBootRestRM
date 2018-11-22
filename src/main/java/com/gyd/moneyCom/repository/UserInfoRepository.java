package com.gyd.moneyCom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gyd.moneyCom.bean.UserInfo;

public interface UserInfoRepository extends CrudRepository<UserInfo, Integer>{
	
	UserInfo findUserInfoById(int id);
	List<UserInfo> findUserInfoByRole(String role);
	
	//只要第一行？？
	@Query(value = "select * from t_user limit ?1", nativeQuery =true)
	List<UserInfo> findAllUsersByCount(int count);

}
