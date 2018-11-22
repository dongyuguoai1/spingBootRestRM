package com.gyd.moneyCom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gyd.moneyCom.bean.AssetInfo;
//import com.gyd.moneyCom.bean.CreditsInfo;
//import com.gyd.moneyCom.bean.DebitCardInfo;
//import com.gyd.moneyCom.bean.UserInfo;
import com.gyd.moneyCom.repository.AssetInfoRepository;
//import com.gyd.moneyCom.repository.CreditsInfoRepository;
//import com.gyd.moneyCom.repository.DebitCardRepository;
//import com.gyd.moneyCom.repository.UserInfoRepository;
import com.gyd.moneyCom.utils.ResultMsg;
import com.gyd.moneyCom.utils.ResultStatusCode;

@RestController
@RequestMapping("AssetInfoCtrl")
public class AssetInfoController {

	@Autowired
	private AssetInfoRepository assetInfoRepository;
	
	@RequestMapping("AssetInfo")
	public Object getAssetInfo(String recordDate)
	{
		//通过记录日期
		AssetInfo assetInfoEntity = assetInfoRepository.findAssetInfoByRecordDate(recordDate);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), assetInfoEntity);
		return resultMsg;
	}
	
//	@RequestMapping("getDebitCards")
//	public Object getDebitCards(String debitCardType)
//	{
//		//通过信用卡类型找到多张卡片
//		List<DebitCardInfo> debitCardEntities = debitCardRepository.findDebitCardInfoByCardType(debitCardType);
//		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), debitCardEntities);
//		return resultMsg;
//	}
	
	@Modifying
	@RequestMapping("addAssetInfo")
	public Object addAssetInfo(@RequestBody AssetInfo assetInfoEntity)
	{
		//新增卡片信息
		assetInfoRepository.save(assetInfoEntity);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), assetInfoEntity);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("updateAssetInfo")
	public Object updateAssetInfo(@RequestBody AssetInfo assetInfoEntity)
	{
		//根据传入的信用卡后四位，找到需要被更新的卡片
		AssetInfo assetInfo = assetInfoRepository.findAssetInfoByRecordDate(assetInfoEntity.getRecordDate());
		if (assetInfo != null)
		{
			//仅更新了信用卡类型，没有更新其他的
			assetInfo.setRecordDate(assetInfoEntity.getRecordDate());
			assetInfoRepository.save(assetInfo);
		}
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
		return resultMsg;
	}
	
//	@Modifying
//	@RequestMapping("deleteAssetInfo")
//	public Object deleteAssetInfo(String last4Num)
//	{
//		//删除卡片
//		assetInfoRepository.delete(last4Num);
//		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
//		return resultMsg;
//	}
	
}
