package com.rideloop.rideloop.repository;

import com.rideloop.rideloop.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPassengerIdOrderByBookingDateDesc(Long passengerId);
    List<Booking> findByRideId(Long rideId);
}
