package com.rideloop.rideloop.controller;

import com.rideloop.rideloop.dto.ApiResponse;
import com.rideloop.rideloop.dto.SubscriptionPlanResponse;
import com.rideloop.rideloop.dto.SubscriptionRequest;
import com.rideloop.rideloop.entity.Subscription;
import com.rideloop.rideloop.service.SubscriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<List<SubscriptionPlanResponse>>> getAvailablePlans() {
        List<SubscriptionPlanResponse> plans = subscriptionService.getAvailablePlans();
        return ResponseEntity.ok(ApiResponse.success("Available subscription plans", plans));
    }

    @PostMapping("/select")
    public ResponseEntity<ApiResponse<Subscription>> selectPlan(@Valid @RequestBody SubscriptionRequest request) {
        Subscription subscription = subscriptionService.selectPlan(request);
        return new ResponseEntity<>(ApiResponse.success("Subscription plan activated successfully", subscription), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<Subscription>> getMySubscription(@RequestParam Long userId) {
        Subscription subscription = subscriptionService.getCurrentUserSubscription(userId);
        return ResponseEntity.ok(ApiResponse.success("Current subscription plan", subscription));
    }
}
