package com.billing.backend.services;

import com.billing.backend.io.OrderRequest;
import com.billing.backend.io.OrderResponse;
import com.billing.backend.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrder();

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}
