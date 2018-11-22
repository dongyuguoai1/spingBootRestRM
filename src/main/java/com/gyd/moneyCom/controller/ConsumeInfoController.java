package com.gyd.moneyCom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gyd.moneyCom.bean.ConsumeInfo;
//import com.gyd.moneyCom.bean.CreditsInfo;
import com.gyd.moneyCom.bean.DebitCardInfo;
import com.gyd.moneyCom.repository.ConsumeInfoRepository;
//import com.gyd.moneyCom.bean.UserInfo;
//import com.gyd.moneyCom.repository.CreditsInfoRepository;
import com.gyd.moneyCom.repository.DebitCardRepository;
//import com.gyd.moneyCom.repository.UserInfoRepository;
import com.gyd.moneyCom.utils.ResultMsg;
import com.gyd.moneyCom.utils.ResultStatusCode;

@RestController
@RequestMapping("ConsumeInfoCtrl")
public class ConsumeInfoController {

	@Autowired
	private ConsumeInfoRepository consumeInfoRepository;
	
	@RequestMapping("ConsumeInfo")
	public Object getConsumeInfo(String consumeTime)
	{
		//通过消费时间
		ConsumeInfo consumeInfoEntity = consumeInfoRepository.findConsumeInfoByConsumeTime(consumeTime);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), consumeInfoEntity);
		return resultMsg;
	}
	

	
	@Modifying
	@RequestMapping("addConsumeInfo")
	public Object addConsumeInfo(@RequestBody ConsumeInfo consumeInfoEntity)
	{
		//新增卡片信息
		consumeInfoRepository.save(consumeInfoEntity);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), consumeInfoEntity);
		return resultMsg;
	}
	
//	@Modifying
//	@RequestMapping("updateDebitCard")
//	public Object updateDebitCard(@RequestBody DebitCardInfo debitCardEntity)
//	{
//		//根据传入的信用卡后四位，找到需要被更新的卡片
//		DebitCardInfo debitCard = debitCardRepository.findDebitCardInfoByLast4Num(debitCardEntity.getLast4Num());
//		if (debitCard != null)
//		{
//			//仅更新了信用卡类型，没有更新其他的
//			debitCard.setCardType(debitCardEntity.getCardType());
//			debitCardRepository.save(debitCard);
//		}
//		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
//		return resultMsg;
//	}
	
	@Modifying
	@RequestMapping("deleteConsumeInfo")
	public Object deleteConsumeInfo(int consumeInfo)
	{
		//删除卡片
		consumeInfoRepository.delete(consumeInfo);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
		return resultMsg;
	}
	
}
