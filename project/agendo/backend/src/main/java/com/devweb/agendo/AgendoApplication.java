package com.devweb.agendo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AgendoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendoApplication.class, args);
	}

}
