package com.gyd.moneyCom.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
 
@Entity
@Table(name="consume")

public class ConsumeInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	private String consumeTime;//消费时间="yyyy-MM-dd HH:mm:ss"
	
	private String consumeType;//消费类型：娱乐，工作，生活，投资
	
	private double consumeMoney; //消费金额
	
	private int last4Num; //卡号后4位
	
	private String cardNum; //卡号：如果没有填888888
	

 
	public int getId() {
		return id;
	}
 
	public void setId(int id) {
		this.id = id;
	}
 
	public String getConsumeTime() {
		return consumeTime;
	}
 
	public void setConsumeTime(String consumeTime) {
		this.consumeTime = consumeTime;
	}
	
	public String getConsumeType() {
		return consumeType;
	}
 
	public void setConsumeType(String consumeType) {
		this.consumeType = consumeType;
	}
	
	public double getConsumeMoney() {
		return consumeMoney;
	}
 
	public void setConsumeMoney(double consumeMoney) {
		this.consumeMoney = consumeMoney;
	}
	
	public String getCardNum() {
		return cardNum;
	}
 
	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}

	
	public int getLast4Num() {
		return last4Num;
	}
 
	public void setLast4Num(int last4Num) {
		this.last4Num = last4Num;
	}


}
