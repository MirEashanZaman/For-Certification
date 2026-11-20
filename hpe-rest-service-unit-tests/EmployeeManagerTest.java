package com.example.restservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EmployeeManagerTest {

    private EmployeeManager employeeManager;

    @BeforeEach
    void setUp() {
        employeeManager = new EmployeeManager();
    }

    @Test
    void testGetAllEmployeesReturnsInitialList() {
        Employees employees = employeeManager.getAllEmployees();
        assertNotNull(employees);
        assertNotNull(employees.getEmployeeList());
        assertTrue(employees.getEmployeeList().size() >= 4,
                "Initial employee list should contain at least 4 hard-coded employees");
    }

    @Test
    void testAddEmployeeIncreasesEmployeeCount() {
        int initialSize = employeeManager.getAllEmployees().getEmployeeList().size();

        Employee newEmployee = new Employee(
                "100",
                "Daria",
                "Jones",
                "daria.jones@example.com",
                "DevOps Engineer");

        employeeManager.addEmployee(newEmployee);

        List<Employee> updatedList = employeeManager.getAllEmployees().getEmployeeList();
        assertEquals(initialSize + 1, updatedList.size());
    }

    @Test
    void testAddedEmployeeFieldsAreStoredCorrectly() {
        Employee expected = new Employee(
                "101",
                "Liam",
                "Chen",
                "liam.chen@example.com",
                "Platform Engineer");

        employeeManager.addEmployee(expected);

        Employee found = employeeManager.getAllEmployees().getEmployeeList().stream()
                .filter(emp -> "101".equals(emp.getEmployee_id()))
                .findFirst()
                .orElse(null);

        assertNotNull(found, "Newly added employee should be found in the list");
        assertEquals("101", found.getEmployee_id());
        assertEquals("Liam", found.getFirst_name());
        assertEquals("Chen", found.getLast_name());
        assertEquals("liam.chen@example.com", found.getEmail());
        assertEquals("Platform Engineer", found.getTitle());
    }

    @Test
    void testEmployeeGettersAndSetters() {
        Employee employee = new Employee();
        employee.setEmployee_id("200");
        employee.setFirst_name("Maya");
        employee.setLast_name("Patel");
        employee.setEmail("maya.patel@example.com");
        employee.setTitle("QA Lead");

        assertEquals("200", employee.getEmployee_id());
        assertEquals("Maya", employee.getFirst_name());
        assertEquals("Patel", employee.getLast_name());
        assertEquals("maya.patel@example.com", employee.getEmail());
        assertEquals("QA Lead", employee.getTitle());
    }
}
