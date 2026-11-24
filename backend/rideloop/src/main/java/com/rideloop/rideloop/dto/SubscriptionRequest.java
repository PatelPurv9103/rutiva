package com.rideloop.rideloop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SubscriptionRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Plan name is required")
    private String planName; // "FREE" or "PREMIUM"

    public SubscriptionRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }
}
