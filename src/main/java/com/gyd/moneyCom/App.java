package com.gyd.moneyCom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
 
/*
 * 		启动类 ：
 * 
 * 			1.@SpringBootApplication:标注这个类为启动类,自动包含了下面三个注解
 * 				@Configuration:标注这个类为整个服务的上下文资源
 * 				@EnableAutoConfiguration:指示springBoot开始基于classPath设置,添加其他bean
 * 				@ComponentScan:告诉spring扫描其他组件/服务/配置
 *
 */
 
 


/**
 * Hello world!
 *
 */
@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        System.out.println( "app !" );
        SpringApplication.run(App.class, args);
    }
}
