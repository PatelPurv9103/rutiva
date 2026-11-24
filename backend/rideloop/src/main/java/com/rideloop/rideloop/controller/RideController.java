package com.rideloop.rideloop.controller;

import com.rideloop.rideloop.dto.ApiResponse;
import com.rideloop.rideloop.dto.RideRequest;
import com.rideloop.rideloop.dto.RideResponse;
import com.rideloop.rideloop.service.RideService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    @Autowired
    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RideResponse>> createRide(@Valid @RequestBody RideRequest request) {
        RideResponse created = rideService.createRide(request);
        return new ResponseEntity<>(ApiResponse.success("Ride published successfully", created), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RideResponse>>> getAllAvailableRides() {
        List<RideResponse> rides = rideService.getAllAvailableRides();
        return ResponseEntity.ok(ApiResponse.success("Available rides retrieved", rides));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RideResponse>> getRideById(@PathVariable Long id) {
        RideResponse ride = rideService.getRideById(id);
        return ResponseEntity.ok(ApiResponse.success("Ride details retrieved", ride));
    }

    /**
     * Search Rides API:
     * GET /api/rides/search?from=Ahmedabad&to=Gandhinagar&date=2026-11-25&seats=2
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RideResponse>>> searchRides(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false, defaultValue = "1") Integer seats) {

        List<RideResponse> rides = rideService.searchRides(from, to, date, seats);
        return ResponseEntity
                .ok(ApiResponse.success("Search completed with " + rides.size() + " ride(s) found", rides));
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<ApiResponse<List<RideResponse>>> getDriverRides(@PathVariable Long driverId) {
        List<RideResponse> rides = rideService.getRidesByDriverId(driverId);
        return ResponseEntity.ok(ApiResponse.success("Driver rides retrieved", rides));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RideResponse>> updateRide(@PathVariable Long id,
            @Valid @RequestBody RideRequest request) {
        RideResponse updated = rideService.updateRide(id, request);
        return ResponseEntity.ok(ApiResponse.success("Ride updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRide(@PathVariable Long id) {
        rideService.deleteRide(id);
        return ResponseEntity.ok(ApiResponse.success("Ride cancelled successfully", null));
    }
}
