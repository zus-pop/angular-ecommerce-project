package com.zus.spring_boot_ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zus.spring_boot_ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
