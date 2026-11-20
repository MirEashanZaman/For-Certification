package com.example.restservice;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RestServiceApplicationTests {

    @Autowired
    private EmployeeController employeeController;

    @Autowired
    private EmployeeManager employeeManager;

    @Test
    void contextLoads() {
        assertNotNull(employeeController);
        assertNotNull(employeeManager);
    }
}
