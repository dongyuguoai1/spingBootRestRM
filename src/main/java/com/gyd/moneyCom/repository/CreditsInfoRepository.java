package com.gyd.moneyCom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gyd.moneyCom.bean.CreditsInfo;


public interface CreditsInfoRepository extends CrudRepository<CreditsInfo, Integer>{
	
	CreditsInfo findCreditsInfoByLast4Num(String Last4Num);
	List<CreditsInfo> findCreditsInfoByCardType(String cardType);
	
	@Query(value = "select * from credits limit ?1", nativeQuery =true)
	List<CreditsInfo> findAllCreditsByCount(int count);

}
