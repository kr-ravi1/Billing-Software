package com.billing.backend.services;

import com.billing.backend.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorPayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
