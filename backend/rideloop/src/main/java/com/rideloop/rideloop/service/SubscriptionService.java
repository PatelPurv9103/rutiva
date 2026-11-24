package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.SubscriptionPlanResponse;
import com.rideloop.rideloop.dto.SubscriptionRequest;
import com.rideloop.rideloop.entity.Subscription;

import java.util.List;

public interface SubscriptionService {
    List<SubscriptionPlanResponse> getAvailablePlans();
    Subscription selectPlan(SubscriptionRequest request);
    Subscription getCurrentUserSubscription(Long userId);
}
