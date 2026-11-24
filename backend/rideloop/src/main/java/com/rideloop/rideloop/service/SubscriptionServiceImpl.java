package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.SubscriptionPlanResponse;
import com.rideloop.rideloop.dto.SubscriptionRequest;
import com.rideloop.rideloop.entity.Subscription;
import com.rideloop.rideloop.entity.User;
import com.rideloop.rideloop.exception.ResourceNotFoundException;
import com.rideloop.rideloop.repository.SubscriptionRepository;
import com.rideloop.rideloop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<SubscriptionPlanResponse> getAvailablePlans() {
        SubscriptionPlanResponse freePlan = new SubscriptionPlanResponse(
                "Free Plan",
                0.0,
                "month",
                "Start your journey with RideLoop.",
                Arrays.asList(
                        "Search available rides",
                        "Book shared rides",
                        "View booking history",
                        "Basic ride management"
                )
        );

        SubscriptionPlanResponse premiumPlan = new SubscriptionPlanResponse(
                "Premium Plan",
                499.0,
                "month",
                "Enjoy premium benefits and priority travel support.",
                Arrays.asList(
                        "Everything in Free Plan",
                        "Premium membership benefits",
                        "Convenient travel planning",
                        "Priority customer support"
                )
        );

        return Arrays.asList(freePlan, premiumPlan);
    }

    @Override
    @Transactional
    public Subscription selectPlan(SubscriptionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        String planName = request.getPlanName().toUpperCase();
        double amount = planName.contains("PREMIUM") ? 499.0 : 0.0;

        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(30);

        Subscription subscription = new Subscription(
                user,
                planName,
                amount,
                start,
                end,
                "ACTIVE"
        );

        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getCurrentUserSubscription(Long userId) {
        return subscriptionRepository.findTopByUserIdAndStatusOrderByEndDateDesc(userId, "ACTIVE")
                .orElse(null);
    }
}
