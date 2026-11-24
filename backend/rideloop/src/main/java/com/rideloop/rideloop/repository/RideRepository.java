package com.rideloop.rideloop.repository;

import com.rideloop.rideloop.entity.Ride;
import com.rideloop.rideloop.entity.RideStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByStatus(RideStatus status);

    List<Ride> findByDriverId(Long driverId);

    @Query("SELECT r FROM Ride r WHERE LOWER(TRIM(r.fromLocation)) = LOWER(TRIM(:from)) " +
           "AND LOWER(TRIM(r.toLocation)) = LOWER(TRIM(:to)) " +
           "AND r.travelDate = :travelDate " +
           "AND r.availableSeats >= :seats " +
           "AND r.availableSeats > 0 " +
           "AND r.status = :status")
    List<Ride> searchRides(@Param("from") String from,
                           @Param("to") String to,
                           @Param("travelDate") LocalDate travelDate,
                           @Param("seats") Integer seats,
                           @Param("status") RideStatus status);
}
