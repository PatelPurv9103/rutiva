package com.rideloop.rideloop.service;

import com.rideloop.rideloop.entity.Booking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Console and async notification implementation demonstrating Multithreading requirement (Section 8.E).
 */
@Service
@Primary
public class ConsoleNotificationService implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(ConsoleNotificationService.class);

    @Override
    @Async("taskExecutor")
    public void sendBookingNotification(Booking booking) {
        try {
            // Simulate realistic background processing delay
            Thread.sleep(1200);
            log.info("==================================================================");
            log.info("[ASYNC THREAD: {}] NOTIFICATION DISPATCHED", Thread.currentThread().getName());
            log.info("To Passenger: {} ({})", booking.getPassenger().getFullName(), booking.getPassenger().getEmail());
            log.info("To Driver: {} ({})", booking.getRide().getDriver().getFullName(), booking.getRide().getDriver().getPhone());
            log.info("Ride #{} Route: {} -> {} on {} at {}",
                    booking.getRide().getId(),
                    booking.getRide().getFromLocation(),
                    booking.getRide().getToLocation(),
                    booking.getRide().getTravelDate(),
                    booking.getRide().getDepartureTime());
            log.info("Seats: {}, Total Fare: Rs. {}", booking.getSeatsBooked(), booking.getTotalFare());
            log.info("Booking Status: CONFIRMED");
            log.info("==================================================================");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Async notification interrupted: {}", e.getMessage());
        }
    }

    @Override
    @Async("taskExecutor")
    public void sendCancellationNotification(Booking booking) {
        try {
            Thread.sleep(800);
            log.info("==================================================================");
            log.info("[ASYNC THREAD: {}] CANCELLATION NOTIFICATION DISPATCHED", Thread.currentThread().getName());
            log.info("Booking #{} for Passenger {} has been CANCELLED.", booking.getId(), booking.getPassenger().getFullName());
            log.info("Seats refunded to Ride #{}: {}", booking.getRide().getId(), booking.getSeatsBooked());
            log.info("==================================================================");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Async cancellation notification interrupted: {}", e.getMessage());
        }
    }
}
