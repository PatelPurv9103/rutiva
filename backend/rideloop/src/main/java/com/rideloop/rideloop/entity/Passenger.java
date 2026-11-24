package com.rideloop.rideloop.entity;

import jakarta.persistence.*;

/**
 * Passenger entity extending User, demonstrating OOP Inheritance.
 */
@Entity
@Table(name = "passengers")
@PrimaryKeyJoinColumn(name = "user_id")
public class Passenger extends User {

    @Column(name = "emergency_contact")
    private String emergencyContact;

    public Passenger() {
        super();
        setRole(Role.PASSENGER);
    }

    public Passenger(String fullName, String email, String phone, String password, String emergencyContact) {
        super(fullName, email, phone, password, Role.PASSENGER);
        this.emergencyContact = emergencyContact;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
}
