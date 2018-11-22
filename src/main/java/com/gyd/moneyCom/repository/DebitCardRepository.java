package com.gyd.moneyCom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gyd.moneyCom.bean.DebitCardInfo;


public interface DebitCardRepository extends CrudRepository<DebitCardInfo, Integer>{
	
	DebitCardInfo findDebitCardInfoByLast4Num(int last4Num);
	List<DebitCardInfo> findDebitCardInfoByCardType(String cardType);
	
	@Query(value = "select * from debitCard limit ?1", nativeQuery =true)
	List<DebitCardInfo> findAllDebitCardByCount(int count);

}
