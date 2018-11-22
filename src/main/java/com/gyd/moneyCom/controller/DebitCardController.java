package com.gyd.moneyCom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.gyd.moneyCom.bean.CreditsInfo;
import com.gyd.moneyCom.bean.DebitCardInfo;
//import com.gyd.moneyCom.bean.UserInfo;
//import com.gyd.moneyCom.repository.CreditsInfoRepository;
import com.gyd.moneyCom.repository.DebitCardRepository;
//import com.gyd.moneyCom.repository.UserInfoRepository;
import com.gyd.moneyCom.utils.ResultMsg;
import com.gyd.moneyCom.utils.ResultStatusCode;

@RestController
@RequestMapping("debitCardCtrl")
public class DebitCardController {

	@Autowired
	private DebitCardRepository debitCardRepository;
	
	@RequestMapping("debitCard")
	public Object getDebitCard(int last4Num)
	{
		//通过后四位找到卡片
		DebitCardInfo debitCardEntity = debitCardRepository.findDebitCardInfoByLast4Num(last4Num);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), debitCardEntity);
		return resultMsg;
	}
	
	@RequestMapping("getDebitCards")
	public Object getDebitCards(String debitCardType)
	{
		//通过信用卡类型找到多张卡片
		List<DebitCardInfo> debitCardEntities = debitCardRepository.findDebitCardInfoByCardType(debitCardType);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), debitCardEntities);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("addDebitCard")
	public Object addDebitCard(@RequestBody DebitCardInfo debitCardEntity)
	{
		//新增卡片信息
		debitCardRepository.save(debitCardEntity);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), debitCardEntity);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("updateDebitCard")
	public Object updateDebitCard(@RequestBody DebitCardInfo debitCardEntity)
	{
		//根据传入的信用卡后四位，找到需要被更新的卡片
		DebitCardInfo debitCard = debitCardRepository.findDebitCardInfoByLast4Num(debitCardEntity.getLast4Num());
		if (debitCard != null)
		{
			//仅更新了信用卡类型，没有更新其他的
			debitCard.setCardType(debitCardEntity.getCardType());
			debitCardRepository.save(debitCard);
		}
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("deleteDebitCard")
	public Object deleteDebitCard(int last4Num)
	{
		//删除卡片
		debitCardRepository.delete(last4Num);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
		return resultMsg;
	}
	
}
