package com.gyd.moneyCom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
 
import com.gyd.moneyCom.service.restful_helloWorld_service;
 
/*
 * 
 * 	控制器:
 * 			1.@RestController:定义控制器
 * 			2.@RequestMapping(
 * 				value = "/login", 
 * 				method = RequestMethod.POST, 
 * 				consumes = "application/json"):url映射/post请求/数据传输为json
 * 			3.@ResponseBody:有响应
 * 
 * 
 * 
 */

@RestController
@RequestMapping("/helloWorld")
public class restful_helloWorld_controller {

	@Autowired
	private restful_helloWorld_service service;
	
    @RequestMapping(value = "/test1",method = RequestMethod.GET,consumes = "application/json")  
    @ResponseBody
	private void test(@RequestParam String a){
    	service.test(a);
    }
    
    @RequestMapping(value = "/test2")  
    @ResponseBody
	private void test2(){
    	service.test("无参数");
    }

	
}
