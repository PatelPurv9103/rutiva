package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.RideRequest;
import com.rideloop.rideloop.dto.RideResponse;

import java.time.LocalDate;
import java.util.List;

public interface RideService {
    RideResponse createRide(RideRequest request);
    List<RideResponse> getAllAvailableRides();
    RideResponse getRideById(Long id);
    List<RideResponse> searchRides(String from, String to, LocalDate date, Integer seats);
    List<RideResponse> getRidesByDriverId(Long driverId);
    RideResponse updateRide(Long id, RideRequest request);
    void deleteRide(Long id);
}
