package com.rideloop.rideloop.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driver_id", nullable = false)
    private User driver;

    @Column(name = "from_location", nullable = false)
    private String fromLocation;

    @Column(name = "to_location", nullable = false)
    private String toLocation;

    @Column(name = "travel_date", nullable = false)
    private LocalDate travelDate;

    @Column(name = "departure_time", nullable = false)
    private String departureTime;

    @Column(name = "vehicle_name")
    private String vehicleName;

    @Column(name = "vehicle_type")
    private String vehicleType = "CAR";

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;

    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;

    @Column(name = "price_per_seat", nullable = false)
    private Double pricePerSeat;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RideStatus status = RideStatus.AVAILABLE;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Version
    private Long version;

    public Ride() {
    }

    public Ride(User driver, String fromLocation, String toLocation, LocalDate travelDate,
                String departureTime, String vehicleName, String vehicleType, Integer totalSeats,
                Integer availableSeats, Double pricePerSeat) {
        this.driver = driver;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.travelDate = travelDate;
        this.departureTime = departureTime;
        this.vehicleName = vehicleName;
        this.vehicleType = (vehicleType != null && !vehicleType.isBlank()) ? vehicleType.toUpperCase() : "CAR";
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
        this.status = RideStatus.AVAILABLE;
        this.createdAt = LocalDateTime.now();
    }

    public Ride(User driver, String fromLocation, String toLocation, LocalDate travelDate,
                String departureTime, String vehicleName, Integer totalSeats,
                Integer availableSeats, Double pricePerSeat) {
        this(driver, fromLocation, toLocation, travelDate, departureTime, vehicleName, "CAR", totalSeats, availableSeats, pricePerSeat);
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
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

    public String getVehicleType() {
        return vehicleType != null ? vehicleType : "CAR";
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Double getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(Double pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
