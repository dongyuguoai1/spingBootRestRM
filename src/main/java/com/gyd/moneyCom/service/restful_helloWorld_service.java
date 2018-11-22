package com.gyd.moneyCom.service;


import org.springframework.stereotype.Service;

/*
 * 
 * 		service(处理业务逻辑):
 * 			1.@Service:标注为服务类
 * 
 * 
 */

@Service
public class restful_helloWorld_service {

	public void test(String a){
		System.out.println("参数 ： "+a);
	}
	
}
