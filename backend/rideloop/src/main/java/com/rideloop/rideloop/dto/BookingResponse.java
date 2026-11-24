package com.rideloop.rideloop.dto;

import com.rideloop.rideloop.entity.Booking;
import com.rideloop.rideloop.entity.BookingStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {
    private Long id;
    private Long rideId;
    private Long passengerId;
    private String passengerName;
    private String passengerEmail;
    private String passengerPhone;
    private String driverName;
    private String driverPhone;
    private String fromLocation;
    private String toLocation;
    private LocalDate travelDate;
    private String departureTime;
    private String vehicleName;
    private String vehicleType;
    private Integer seatsBooked;
    private Double pricePerSeat;
    private Double totalFare;
    private String paymentMethod;
    private String paymentStatus;
    private String selectedDays;
    private BookingStatus bookingStatus;
    private LocalDateTime bookingDate;

    public BookingResponse() {
    }

    public BookingResponse(Booking booking) {
        this.id = booking.getId();
        if (booking.getPassenger() != null) {
            this.passengerId = booking.getPassenger().getId();
            this.passengerName = booking.getPassenger().getFullName();
            this.passengerEmail = booking.getPassenger().getEmail();
            this.passengerPhone = booking.getPassenger().getPhone();
        }
        if (booking.getRide() != null) {
            this.rideId = booking.getRide().getId();
            this.fromLocation = booking.getRide().getFromLocation();
            this.toLocation = booking.getRide().getToLocation();
            this.travelDate = booking.getRide().getTravelDate();
            this.departureTime = booking.getRide().getDepartureTime();
            this.vehicleName = booking.getRide().getVehicleName();
            this.vehicleType = booking.getRide().getVehicleType();
            this.pricePerSeat = booking.getRide().getPricePerSeat();
            if (booking.getRide().getDriver() != null) {
                this.driverName = booking.getRide().getDriver().getFullName();
                this.driverPhone = booking.getRide().getDriver().getPhone();
            }
        }
        this.seatsBooked = booking.getSeatsBooked();
        this.totalFare = booking.getTotalFare();
        this.paymentMethod = booking.getPaymentMethod();
        this.paymentStatus = booking.getPaymentStatus();
        this.selectedDays = booking.getSelectedDays();
        this.bookingStatus = booking.getBookingStatus();
        this.bookingDate = booking.getBookingDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public void setPassengerEmail(String passengerEmail) {
        this.passengerEmail = passengerEmail;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public void setPassengerPhone(String passengerPhone) {
        this.passengerPhone = passengerPhone;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return driverPhone;
    }

    public void setDriverPhone(String driverPhone) {
        this.driverPhone = driverPhone;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public Integer getSeatsBooked() {
        return seatsBooked;
    }

    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public Double getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(Double pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    public Double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(Double totalFare) {
        this.totalFare = totalFare;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getSelectedDays() {
        return selectedDays;
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
