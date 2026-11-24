package com.rideloop.rideloop.service;

import com.rideloop.rideloop.entity.Booking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Secondary implementation of NotificationService demonstrating Polymorphism.
 */
@Service("emailNotificationService")
public class EmailNotificationService implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    @Override
    @Async("taskExecutor")
    public void sendBookingNotification(Booking booking) {
        log.info("[EMAIL SERVICE] Simulating email to {}: Booking #{} confirmed.",
                booking.getPassenger().getEmail(), booking.getId());
    }

    @Override
    @Async("taskExecutor")
    public void sendCancellationNotification(Booking booking) {
        log.info("[EMAIL SERVICE] Simulating cancellation email to {}: Booking #{} cancelled.",
                booking.getPassenger().getEmail(), booking.getId());
    }
}
