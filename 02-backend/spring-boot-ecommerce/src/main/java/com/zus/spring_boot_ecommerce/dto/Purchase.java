package com.zus.spring_boot_ecommerce.dto;

import java.util.Set;

import com.zus.spring_boot_ecommerce.entity.Address;
import com.zus.spring_boot_ecommerce.entity.Customer;
import com.zus.spring_boot_ecommerce.entity.Order;
import com.zus.spring_boot_ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;    
}
