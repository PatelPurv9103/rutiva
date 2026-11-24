package com.rideloop.rideloop.dto;

import java.util.List;

public class SubscriptionPlanResponse {
    private String planName;
    private Double price;
    private String duration;
    private String description;
    private List<String> features;

    public SubscriptionPlanResponse() {
    }

    public SubscriptionPlanResponse(String planName, Double price, String duration, String description, List<String> features) {
        this.planName = planName;
        this.price = price;
        this.duration = duration;
        this.description = description;
        this.features = features;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }
}
