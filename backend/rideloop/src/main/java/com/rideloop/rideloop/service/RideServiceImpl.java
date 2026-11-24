package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.RideRequest;
import com.rideloop.rideloop.dto.RideResponse;
import com.rideloop.rideloop.entity.Ride;
import com.rideloop.rideloop.entity.RideStatus;
import com.rideloop.rideloop.entity.User;
import com.rideloop.rideloop.exception.ResourceNotFoundException;
import com.rideloop.rideloop.exception.RideNotFoundException;
import com.rideloop.rideloop.repository.RideRepository;
import com.rideloop.rideloop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    @Autowired
    public RideServiceImpl(RideRepository rideRepository, UserRepository userRepository) {
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public RideResponse createRide(RideRequest request) {
        User driver = userRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with ID: " + request.getDriverId()));

        Ride ride = new Ride(
                driver,
                request.getFromLocation().trim(),
                request.getToLocation().trim(),
                request.getTravelDate(),
                request.getDepartureTime().trim(),
                request.getVehicleName(),
                request.getVehicleType(),
                request.getTotalSeats(),
                request.getAvailableSeats(),
                request.getPricePerSeat()
        );

        Ride savedRide = rideRepository.save(ride);
        return new RideResponse(savedRide);
    }

    @Override
    public List<RideResponse> getAllAvailableRides() {
        return rideRepository.findByStatus(RideStatus.AVAILABLE)
                .stream()
                .filter(r -> r.getAvailableSeats() > 0)
                .map(RideResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public RideResponse getRideById(Long id) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException("Ride not found with ID: " + id));
        return new RideResponse(ride);
    }

    @Override
    public List<RideResponse> searchRides(String from, String to, LocalDate date, Integer seats) {
        if (from == null || to == null || date == null) {
            throw new IllegalArgumentException("From location, to location, and travel date are required for search.");
        }
        int minSeats = (seats != null && seats > 0) ? seats : 1;

        List<Ride> matchingRides = rideRepository.searchRides(
                from.trim(),
                to.trim(),
                date,
                minSeats,
                RideStatus.AVAILABLE
        );

        return matchingRides.stream()
                .map(RideResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<RideResponse> getRidesByDriverId(Long driverId) {
        return rideRepository.findByDriverId(driverId)
                .stream()
                .map(RideResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RideResponse updateRide(Long id, RideRequest request) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException("Ride not found with ID: " + id));

        ride.setFromLocation(request.getFromLocation().trim());
        ride.setToLocation(request.getToLocation().trim());
        ride.setTravelDate(request.getTravelDate());
        ride.setDepartureTime(request.getDepartureTime().trim());
        if (request.getVehicleName() != null) {
            ride.setVehicleName(request.getVehicleName());
        }
        if (request.getVehicleType() != null) {
            ride.setVehicleType(request.getVehicleType());
        }
        ride.setTotalSeats(request.getTotalSeats());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setPricePerSeat(request.getPricePerSeat());

        if (ride.getAvailableSeats() <= 0) {
            ride.setStatus(RideStatus.FULL);
        } else {
            ride.setStatus(RideStatus.AVAILABLE);
        }

        Ride updated = rideRepository.save(ride);
        return new RideResponse(updated);
    }

    @Override
    @Transactional
    public void deleteRide(Long id) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException("Ride not found with ID: " + id));
        ride.setStatus(RideStatus.CANCELLED);
        rideRepository.save(ride);
    }
}
