package com.rideloop.rideloop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ride_id", nullable = false)
    private Ride ride;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "passenger_id", nullable = false)
    private User passenger;

    @Column(name = "seats_booked", nullable = false)
    private Integer seatsBooked;

    @Column(name = "total_fare", nullable = false)
    private Double totalFare;

    @Column(name = "payment_method")
    private String paymentMethod = "WALLET_AFTER_RIDE";

    @Column(name = "payment_status")
    private String paymentStatus = "PENDING_AFTER_RIDE";

    @Column(name = "selected_days")
    private String selectedDays = "Single Trip";

    @Enumerated(EnumType.STRING)
    @Column(name = "booking_status", nullable = false)
    private BookingStatus bookingStatus = BookingStatus.CONFIRMED;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    public Booking() {
    }

    public Booking(Ride ride, User passenger, Integer seatsBooked, Double totalFare,
                   String paymentMethod, String selectedDays) {
        this.ride = ride;
        this.passenger = passenger;
        this.seatsBooked = seatsBooked;
        this.totalFare = totalFare;
        this.paymentMethod = (paymentMethod != null && !paymentMethod.isBlank()) ? paymentMethod : "WALLET_AFTER_RIDE";
        this.paymentStatus = "PENDING_AFTER_RIDE";
        this.selectedDays = (selectedDays != null && !selectedDays.isBlank()) ? selectedDays : "Single Trip";
        this.bookingStatus = BookingStatus.CONFIRMED;
        this.bookingDate = LocalDateTime.now();
    }

    public Booking(Ride ride, User passenger, Integer seatsBooked, Double totalFare) {
        this(ride, passenger, seatsBooked, totalFare, "WALLET_AFTER_RIDE", "Single Trip");
    }

    @PrePersist
    public void prePersist() {
        if (this.bookingDate == null) {
            this.bookingDate = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ride getRide() {
        return ride;
    }

    public void setRide(Ride ride) {
        this.ride = ride;
    }

    public User getPassenger() {
        return passenger;
    }

    public void setPassenger(User passenger) {
        this.passenger = passenger;
    }

    public Integer getSeatsBooked() {
        return seatsBooked;
    }

    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public Double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(Double totalFare) {
        this.totalFare = totalFare;
    }

    public String getPaymentMethod() {
        return paymentMethod != null ? paymentMethod : "WALLET_AFTER_RIDE";
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus != null ? paymentStatus : "PENDING_AFTER_RIDE";
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getSelectedDays() {
        return selectedDays != null ? selectedDays : "Single Trip";
    }

    public void setSelectedDays(String selectedDays) {
        this.selectedDays = selectedDays;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}
