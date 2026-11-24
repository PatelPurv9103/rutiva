package com.rideloop.rideloop.controller;

import com.rideloop.rideloop.dto.ApiResponse;
import com.rideloop.rideloop.dto.BookingRequest;
import com.rideloop.rideloop.dto.BookingResponse;
import com.rideloop.rideloop.entity.Booking;
import com.rideloop.rideloop.repository.BookingRepository;
import com.rideloop.rideloop.service.BookingService;
import com.rideloop.rideloop.service.FileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;
    private final FileService fileService;

    @Autowired
    public BookingController(BookingService bookingService,
                             BookingRepository bookingRepository,
                             FileService fileService) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
        this.fileService = fileService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@Valid @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.createBooking(request);
        return new ResponseEntity<>(ApiResponse.success("Booking confirmed successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(@RequestParam Long passengerId) {
        List<BookingResponse> bookings = bookingService.getBookingsByPassenger(passengerId);
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved", bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable Long id) {
        BookingResponse booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(ApiResponse.success("Booking details retrieved", booking));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(@PathVariable Long id) {
        BookingResponse cancelled = bookingService.cancelBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", cancelled));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<BookingResponse>> completeBooking(@PathVariable Long id) {
        BookingResponse completed = bookingService.completeBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Ride marked completed and payment processed", completed));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking deleted successfully", null));
    }

    @GetMapping("/ride/{rideId}")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getBookingsForRide(@PathVariable Long rideId) {
        List<BookingResponse> bookings = bookingService.getBookingsByRideId(rideId);
        return ResponseEntity.ok(ApiResponse.success("Ride passenger bookings retrieved", bookings));
    }

    /**
     * File Handling API: Export user's booking history to CSV.
     * GET /api/bookings/export/csv?passengerId=1
     */
    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportBookingsToCsv(@RequestParam Long passengerId) {
        List<Booking> bookings = bookingRepository.findByPassengerIdOrderByBookingDateDesc(passengerId);
        byte[] csvBytes = fileService.exportBookingsToCsv(bookings);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "my_rides_history.csv");

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    /**
     * File Handling API: View generated booking receipt.
     * GET /api/bookings/{id}/receipt
     */
    @GetMapping("/{id}/receipt")
    public ResponseEntity<String> getBookingReceipt(@PathVariable Long id) {
        String receipt = fileService.readBookingReceiptFile("receipt_booking_" + id + ".txt");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        return new ResponseEntity<>(receipt, headers, HttpStatus.OK);
    }
}
