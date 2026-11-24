package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.BookingRequest;
import com.rideloop.rideloop.dto.BookingResponse;
import com.rideloop.rideloop.entity.*;
import com.rideloop.rideloop.exception.InsufficientSeatsException;
import com.rideloop.rideloop.exception.InvalidBookingException;
import com.rideloop.rideloop.exception.ResourceNotFoundException;
import com.rideloop.rideloop.exception.RideNotFoundException;
import com.rideloop.rideloop.repository.BookingRepository;
import com.rideloop.rideloop.repository.RideRepository;
import com.rideloop.rideloop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final FileService fileService;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              RideRepository rideRepository,
                              UserRepository userRepository,
                              NotificationService notificationService,
                              FileService fileService) {
        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.fileService = fileService;
    }

    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // 1. Validate Ride
        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new RideNotFoundException("Ride not found with ID: " + request.getRideId()));

        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new InvalidBookingException("This ride has been cancelled by the driver.");
        }

        // 2. Validate Seat Availability (Concurrency-Safe Check)
        if (request.getSeatsBooked() <= 0) {
            throw new InvalidBookingException("Seats booked must be greater than zero.");
        }

        if (ride.getAvailableSeats() < request.getSeatsBooked()) {
            throw new InsufficientSeatsException(
                    "Only " + ride.getAvailableSeats() + " seat(s) available, but requested: " + request.getSeatsBooked());
        }

        // 3. Resolve Passenger
        User passenger;
        if (request.getPassengerId() != null) {
            passenger = userRepository.findById(request.getPassengerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Passenger not found with ID: " + request.getPassengerId()));
        } else if (request.getPassengerEmail() != null && !request.getPassengerEmail().isBlank()) {
            String email = request.getPassengerEmail().trim().toLowerCase();
            passenger = userRepository.findByEmail(email).orElseGet(() -> {
                Passenger newP = new Passenger(
                        request.getPassengerName() != null ? request.getPassengerName().trim() : "Passenger",
                        email,
                        request.getPassengerPhone() != null ? request.getPassengerPhone().trim() : "0000000000",
                        "$2a$10$demoHashForGuestPassengerRegistration99999", // Placeholder hash for walk-in
                        request.getPassengerPhone()
                );
                return userRepository.save(newP);
            });
        } else {
            throw new InvalidBookingException("Passenger ID or Passenger Details (Name, Email, Phone) must be provided.");
        }

        // 4. Calculate Total Fare (Supports Multi-Day recurring rides with 10% discount)
        int dayCount = 1;
        String days = request.getSelectedDays();
        if (days != null && days.contains(",")) {
            dayCount = days.split(",").length;
        } else if (days != null && (days.equalsIgnoreCase("WEEKDAYS") || days.equalsIgnoreCase("MON-FRI"))) {
            dayCount = 5;
        }
        double baseFare = ride.getPricePerSeat() * request.getSeatsBooked() * Math.max(1, dayCount);
        double totalFare = (dayCount > 1) ? Math.round(baseFare * 0.90) : baseFare;

        // 5. Update Seat Availability
        ride.setAvailableSeats(ride.getAvailableSeats() - request.getSeatsBooked());
        if (ride.getAvailableSeats() == 0) {
            ride.setStatus(RideStatus.FULL);
        }
        rideRepository.save(ride);

        // 6. Save Booking
        Booking booking = new Booking(
                ride,
                passenger,
                request.getSeatsBooked(),
                totalFare,
                request.getPaymentMethod(),
                request.getSelectedDays()
        );
        Booking savedBooking = bookingRepository.save(booking);

        // 7. Multithreading: Async Booking Notification
        notificationService.sendBookingNotification(savedBooking);

        // 8. File Handling: Save Receipt to Local File
        fileService.saveBookingReceiptToFile(savedBooking);

        return new BookingResponse(savedBooking);
    }

    @Override
    public List<BookingResponse> getBookingsByPassenger(Long passengerId) {
        return bookingRepository.findByPassengerIdOrderByBookingDateDesc(passengerId)
                .stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return new BookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new InvalidBookingException("Booking is already cancelled.");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);

        // Refund seats back to the ride
        Ride ride = booking.getRide();
        if (ride != null) {
            ride.setAvailableSeats(ride.getAvailableSeats() + booking.getSeatsBooked());
            if (ride.getStatus() == RideStatus.FULL && ride.getAvailableSeats() > 0) {
                ride.setStatus(RideStatus.AVAILABLE);
            }
            rideRepository.save(ride);
        }

        Booking updated = bookingRepository.save(booking);

        // Multithreading: Async Cancellation Notification
        notificationService.sendCancellationNotification(updated);

        return new BookingResponse(updated);
    }

    @Override
    @Transactional
    public BookingResponse completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        booking.setBookingStatus(BookingStatus.COMPLETED);
        booking.setPaymentStatus("PAID");

        // Deduct from user wallet if payment method was WALLET_AFTER_RIDE
        if ("WALLET_AFTER_RIDE".equalsIgnoreCase(booking.getPaymentMethod())) {
            User passenger = booking.getPassenger();
            if (passenger != null) {
                double currentBal = passenger.getWalletBalance();
                passenger.setWalletBalance(Math.max(0.0, currentBal - booking.getTotalFare()));
                userRepository.save(passenger);
            }
        }

        Booking updated = bookingRepository.save(booking);
        return new BookingResponse(updated);
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        // Restore seats if not already cancelled
        Ride ride = booking.getRide();
        if (ride != null && booking.getBookingStatus() != BookingStatus.CANCELLED) {
            ride.setAvailableSeats(ride.getAvailableSeats() + booking.getSeatsBooked());
            if (ride.getStatus() == RideStatus.FULL && ride.getAvailableSeats() > 0) {
                ride.setStatus(RideStatus.AVAILABLE);
            }
            rideRepository.save(ride);
        }

        bookingRepository.delete(booking);
    }

    @Override
    public List<BookingResponse> getBookingsByRideId(Long rideId) {
        return bookingRepository.findByRideId(rideId)
                .stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }
}
