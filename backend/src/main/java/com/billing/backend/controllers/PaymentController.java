package com.billing.backend.controllers;

import com.billing.backend.io.OrderResponse;
import com.billing.backend.io.PaymentRequest;
import com.billing.backend.io.PaymentVerificationRequest;
import com.billing.backend.io.RazorpayOrderResponse;
import com.billing.backend.services.OrderService;
import com.billing.backend.services.RazorPayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorPayService razorPayService;

    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {

        return razorPayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}
