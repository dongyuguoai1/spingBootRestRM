package com.gyd.moneyCom.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
 
@Entity
@Table(name="credits")

public class CreditsInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	private String cardType; //卡类型：信用卡；蚂蚁花呗；蚂蚁借呗；京东白条
		
	private String cardLimit; //卡片额度
	
	private String repayDate; //还款日期：每月的哪一日
	
	private String validityPeriod; //有效期：yyyy-MM-dd
		
	private String last4Num; //卡号后4位
	
	private String issuingBank; //发行银行
 
	public int getId() {
		return id;
	}
 
	public void setId(int id) {
		this.id = id;
	}
 
	public String getCardType() {
		return cardType;
	}
 
	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
 
	public String getCardLimit() {
		return cardLimit;
	}
 
	public void setCardLimit(String cardLimit) {
		this.cardLimit = cardLimit;
	}
	
	
	
	public String getRepayDate() {
		return repayDate;
	}
 
	public void setRepayDate(String repayDate) {
		this.repayDate = repayDate;
	}
 
	public String getValidityPeriod() {
		return validityPeriod;
	}
 
	public void setValidityPeriod(String validityPeriod) {
		this.validityPeriod = validityPeriod;
	}
	
	public String getLast4Num() {
		return last4Num;
	}
 
	public void setLast4Num(String last4Num) {
		this.last4Num = last4Num;
	}
	
	public String getIssuingBank() {
		return issuingBank;
	}
 
	public void setIssuingBank(String issuingBank) {
		this.issuingBank = issuingBank;
	}

}
