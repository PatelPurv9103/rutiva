package com.rideloop.rideloop.service;

import com.rideloop.rideloop.entity.Booking;

/**
 * Interface demonstrating OOP Interface requirement.
 * Multiple implementations: ConsoleNotificationService, EmailNotificationService
 */
public interface NotificationService {
    void sendBookingNotification(Booking booking);
    void sendCancellationNotification(Booking booking);
}
