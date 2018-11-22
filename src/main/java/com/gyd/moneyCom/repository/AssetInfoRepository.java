package com.gyd.moneyCom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gyd.moneyCom.bean.AssetInfo;
//import com.gyd.moneyCom.bean.CreditsInfo;


public interface AssetInfoRepository extends CrudRepository<AssetInfo, Integer>{
	
	AssetInfo findAssetInfoByRecordDate(String recordDate);
//	List<AssetInfo> findAssetInfoByCardType(String cardType);
	
	@Query(value = "select * from asset limit ?1", nativeQuery =true)
	List<AssetInfo> findAllAssetInfoByCount(int count);

}
