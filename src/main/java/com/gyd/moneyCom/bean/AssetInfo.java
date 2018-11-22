package com.gyd.moneyCom.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
 
@Entity
@Table(name="asset")

public class AssetInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	private double totalAsset; //总资产
	
	private double totalLiabilities; //总负债
	
	private double monthLiabilities; //月负债
	
	private double monthWages; //月工资
	
	private double expenseIncome; //报账收入
	
	private double expenseLiabilities; //报账负债
	
	private String recordDate; //记录日期：yyyy-MM-dd
	

 
	public int getId() {
		return id;
	}
 
	public void setId(int id) {
		this.id = id;
	}
 
	public double getTotalAsset() {
		return totalAsset;
	}
 
	public void setTotalAsset(double totalAsset) {
		this.totalAsset = totalAsset;
	}
	public double getTotalLiabilities() {
		return totalLiabilities;
	}
 
	public void setTotalLiabilities(double totalLiabilities) {
		this.totalLiabilities = totalLiabilities;
	}
	
	public double getMonthLiabilities() {
		return monthLiabilities;
	}
 
	public void setMonthLiabilities(double monthLiabilities) {
		this.monthLiabilities = monthLiabilities;
	}
	
	public double getMonthWages() {
		return monthWages;
	}
 
	public void setMonthWages(double monthWages) {
		this.monthWages = monthWages;
	}
	
	public double getExpenseIncome() {
		return expenseIncome;
	}
 
	public void setExpenseIncome(double expenseIncome) {
		this.expenseIncome = expenseIncome;
	}
	
	public double getExpenseLiabilities() {
		return expenseLiabilities;
	}
 
	public void setExpenseLiabilities(double expenseLiabilities) {
		this.expenseLiabilities = expenseLiabilities;
	}
	
	public String getRecordDate() {
		return recordDate;
	}
 
	public void setRecordDate(String recordDate) {
		this.recordDate = recordDate;
	}
	
//	public String getCardType() {
//		return cardType;
//	}
// 
//	public void setCardType(String cardType) {
//		this.cardType = cardType;
//	}
 
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

	
//	public int getLast4Num() {
//		return last4Num;
//	}
// 
//	public void setLast4Num(int last4Num) {
//		this.last4Num = last4Num;
//	}
	
//	public String getIssuingBank() {
//		return issuingBank;
//	}
// 
//	public void setIssuingBank(String issuingBank) {
//		this.issuingBank = issuingBank;
//	}

}
