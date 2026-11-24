package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.BookingRequest;
import com.rideloop.rideloop.dto.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);
    List<BookingResponse> getBookingsByPassenger(Long passengerId);
    BookingResponse getBookingById(Long id);
    BookingResponse cancelBooking(Long id);
    BookingResponse completeBooking(Long id);
    void deleteBooking(Long id);
    List<BookingResponse> getBookingsByRideId(Long rideId);
}
