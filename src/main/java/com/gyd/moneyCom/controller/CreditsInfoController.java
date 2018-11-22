package com.gyd.moneyCom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gyd.moneyCom.bean.CreditsInfo;
import com.gyd.moneyCom.bean.User;
//import com.gyd.moneyCom.bean.UserInfo;
import com.gyd.moneyCom.repository.CreditsInfoRepository;
//import com.gyd.moneyCom.repository.UserInfoRepository;
import com.gyd.moneyCom.utils.ResultMsg;
import com.gyd.moneyCom.utils.ResultStatusCode;

@RestController
@RequestMapping("creditsCtrl")
public class CreditsInfoController {

	@Autowired
	private CreditsInfoRepository creditsInfoRepository;
	
	@RequestMapping("getcredit")
	public Object getCredit(String last4Num)
	{
		//通过后四位找到卡片
		CreditsInfo creditEntity = creditsInfoRepository.findCreditsInfoByLast4Num(last4Num);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), creditEntity);
		return resultMsg;
	}
	
	@RequestMapping("getcredits")
	public Object getCredits(String cardType)
	{
		//通过信用卡类型找到卡片
		List<CreditsInfo> creditEntities = creditsInfoRepository.findCreditsInfoByCardType(cardType);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), creditEntities);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("addcredit")
	public Object addCredit(@RequestBody CreditsInfo creditEntity)
	{
		//新增卡片信息
		creditsInfoRepository.save(creditEntity);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), creditEntity);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("deleteCredit")
	public  Object deleteCredit(int id)
	{
		//新增卡片信息
		creditsInfoRepository.delete(id);
		ResultMsg resultMsg = new ResultMsg(ResultStatusCode.OK.getErrcode(), ResultStatusCode.OK.getErrmsg(), null);
		return resultMsg;
	}
	
	@Modifying
	@RequestMapping("getAllCredits")
	public Iterable<CreditsInfo> getAll(){
		//新增卡片信息
		return creditsInfoRepository.findAll();
	}
	

}
