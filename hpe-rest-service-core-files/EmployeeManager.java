package com.example.restservice;

import org.springframework.stereotype.Repository;

@Repository
public class EmployeeManager {

    private static Employees list = new Employees();

    static {
        list.getEmployeeList().add(new Employee(
                "1",
                "Prem",
                "Tiwari",
                "prem.tiwari@example.com",
                "Software Engineer"));

        list.getEmployeeList().add(new Employee(
                "2",
                "Vikash",
                "Kumar",
                "vikash.kumar@example.com",
                "Senior Systems Architect"));

        list.getEmployeeList().add(new Employee(
                "3",
                "Ritesh",
                "Ojha",
                "ritesh.ojha@example.com",
                "Cloud Solutions Engineer"));

        list.getEmployeeList().add(new Employee(
                "4",
                "Sarah",
                "Jenkins",
                "sarah.jenkins@example.com",
                "Engineering Manager"));
    }

    public Employees getAllEmployees() {
        return list;
    }

    public void addEmployee(Employee employee) {
        list.getEmployeeList().add(employee);
    }
}
