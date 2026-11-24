package com.rideloop.rideloop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class BookingRequest {

    @NotNull(message = "Ride ID is required")
    private Long rideId;

    private Long passengerId;

    private String passengerName;
    private String passengerEmail;
    private String passengerPhone;

    @NotNull(message = "Number of seats booked is required")
    @Min(value = 1, message = "At least 1 seat must be booked")
    private Integer seatsBooked;

    private String paymentMethod; // "WALLET_AFTER_RIDE" or "CASH_AFTER_RIDE"
    private String selectedDays;  // "Single Trip" or "Mon, Wed, Fri"

    public BookingRequest() {
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public void setPassengerEmail(String passengerEmail) {
        this.passengerEmail = passengerEmail;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public void setPassengerPhone(String passengerPhone) {
        this.passengerPhone = passengerPhone;
    }

    public Integer getSeatsBooked() {
        return seatsBooked;
    }

    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public String getPaymentMethod() {
        return paymentMethod != null ? paymentMethod : "WALLET_AFTER_RIDE";
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getSelectedDays() {
        return selectedDays != null ? selectedDays : "Single Trip";
    }

    public void setSelectedDays(String selectedDays) {
        this.selectedDays = selectedDays;
    }
}
