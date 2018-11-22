package com.gyd.moneyCom.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
 
@Entity
@Table(name="debitCard")

public class DebitCardInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	private String cardType; //卡类型：借记卡
	
	private String cardNum; //卡号：如果没有填888888
	
	//private double cardLimit; //卡片额度
	
	//private int repayDate; //还款日期：每月的哪一日
	
	//private String validityPeriod; //有效期：yyyy-MM-dd
	
	private double remainder; //余额
	
	private int last4Num; //卡号后4位
	
	private String issuingBank; //发行银行
 
	public int getId() {
		return id;
	}
 
	public void setId(int id) {
		this.id = id;
	}
 
	public String getCardNum() {
		return cardNum;
	}
 
	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}
	
	public String getCardType() {
		return cardType;
	}
 
	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
 
//	public double getCardLimit() {
//		return cardLimit;
//	}
// 
//	public void setCardLimit(double cardLimit) {
//		this.cardLimit = cardLimit;
//	}
//	
	
	
//	public int getRepayDate() {
//		return repayDate;
//	}
// 
//	public void setRepayDate(int repayDate) {
//		this.repayDate = repayDate;
//	}
// 
//	public String getValidityPeriod() {
//		return validityPeriod;
//	}
// 
//	public void setValidityPeriod(String validityPeriod) {
//		this.validityPeriod = validityPeriod;
//	}
// 
	public double getRemainder() {
		return remainder;
	}
 
	public void setRemainder(double remainder) {
		this.remainder = remainder;
	}
	
	public int getLast4Num() {
		return last4Num;
	}
 
	public void setLast4Num(int last4Num) {
		this.last4Num = last4Num;
	}
	
	public String getIssuingBank() {
		return issuingBank;
	}
 
	public void setIssuingBank(String issuingBank) {
		this.issuingBank = issuingBank;
	}

}
