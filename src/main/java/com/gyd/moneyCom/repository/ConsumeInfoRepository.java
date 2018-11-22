package com.gyd.moneyCom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gyd.moneyCom.bean.ConsumeInfo;
import com.gyd.moneyCom.bean.CreditsInfo;


public interface ConsumeInfoRepository extends CrudRepository<ConsumeInfo, Integer>{
	
	ConsumeInfo findConsumeInfoByConsumeTime(String consumeTime);

	
	@Query(value = "select * from consume limit ?1", nativeQuery =true)
	List<ConsumeInfo> findAllConsumeInfoByCount(int count);

}
