package com.rideloop.rideloop.entity;

import jakarta.persistence.*;

/**
 * Driver entity extending User, demonstrating OOP Inheritance.
 */
@Entity
@Table(name = "drivers")
@PrimaryKeyJoinColumn(name = "user_id")
public class Driver extends User {

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "vehicle_model")
    private String vehicleModel;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    public Driver() {
        super();
        setRole(Role.DRIVER);
    }

    public Driver(String fullName, String email, String phone, String password,
                  String licenseNumber, String vehicleModel, String vehicleNumber) {
        super(fullName, email, phone, password, Role.DRIVER);
        this.licenseNumber = licenseNumber;
        this.vehicleModel = vehicleModel;
        this.vehicleNumber = vehicleNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }
}
