package com.rideloop.rideloop.dto;

import com.rideloop.rideloop.entity.Ride;
import com.rideloop.rideloop.entity.RideStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RideResponse {
    private Long id;
    private Long driverId;
    private String driverName;
    private String driverPhone;
    private String fromLocation;
    private String toLocation;
    private LocalDate travelDate;
    private String departureTime;
    private String vehicleName;
    private String vehicleType;
    private Integer totalSeats;
    private Integer availableSeats;
    private Double pricePerSeat;
    private RideStatus status;
    private LocalDateTime createdAt;

    public RideResponse() {
    }

    public RideResponse(Ride ride) {
        this.id = ride.getId();
        if (ride.getDriver() != null) {
            this.driverId = ride.getDriver().getId();
            this.driverName = ride.getDriver().getFullName();
            this.driverPhone = ride.getDriver().getPhone();
        }
        this.fromLocation = ride.getFromLocation();
        this.toLocation = ride.getToLocation();
        this.travelDate = ride.getTravelDate();
        this.departureTime = ride.getDepartureTime();
        this.vehicleName = ride.getVehicleName();
        this.vehicleType = ride.getVehicleType();
        this.totalSeats = ride.getTotalSeats();
        this.availableSeats = ride.getAvailableSeats();
        this.pricePerSeat = ride.getPricePerSeat();
        this.status = ride.getStatus();
        this.createdAt = ride.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return driverPhone;
    }

    public void setDriverPhone(String driverPhone) {
        this.driverPhone = driverPhone;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getVehicleType() {
        return vehicleType != null ? vehicleType : "CAR";
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Double getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(Double pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
