package com.zus.spring_boot_ecommerce.service;

import com.zus.spring_boot_ecommerce.dto.Purchase;
import com.zus.spring_boot_ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
