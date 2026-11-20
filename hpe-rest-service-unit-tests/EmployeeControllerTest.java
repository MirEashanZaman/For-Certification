package com.example.restservice;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
class EmployeeControllerTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @Mock
    private EmployeeManager employeeManager;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetEmployeesReturnsJsonList() throws Exception {
        Employee emp1 = new Employee("1", "Prem", "Tiwari", "prem.tiwari@example.com", "Software Engineer");
        Employee emp2 = new Employee("2", "Vikash", "Kumar", "vikash.kumar@example.com", "Senior Systems Architect");

        Employees mockEmployees = new Employees();
        mockEmployees.setEmployeeList(Arrays.asList(emp1, emp2));

        when(employeeManager.getAllEmployees()).thenReturn(mockEmployees);

        mockMvc.perform(get("/employees")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeList", hasSize(2)))
                .andExpect(jsonPath("$.employeeList[0].employee_id", is("1")))
                .andExpect(jsonPath("$.employeeList[0].first_name", is("Prem")))
                .andExpect(jsonPath("$.employeeList[0].last_name", is("Tiwari")))
                .andExpect(jsonPath("$.employeeList[0].email", is("prem.tiwari@example.com")))
                .andExpect(jsonPath("$.employeeList[0].title", is("Software Engineer")))
                .andExpect(jsonPath("$.employeeList[1].employee_id", is("2")))
                .andExpect(jsonPath("$.employeeList[1].first_name", is("Vikash")));

        verify(employeeManager, times(1)).getAllEmployees();
    }

    @Test
    void testAddEmployeeReturnsCreatedStatusAndLocation() throws Exception {
        Employee newEmployee = new Employee(
                "5",
                "Alex",
                "Morgan",
                "alex.morgan@example.com",
                "Backend Developer");

        doNothing().when(employeeManager).addEmployee(any(Employee.class));

        mockMvc.perform(post("/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newEmployee)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/employees/5")));

        verify(employeeManager, times(1)).addEmployee(any(Employee.class));
    }
}
