package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.AuthResponse;
import com.rideloop.rideloop.dto.LoginRequest;
import com.rideloop.rideloop.dto.SignupRequest;
import com.rideloop.rideloop.entity.Driver;
import com.rideloop.rideloop.entity.Passenger;
import com.rideloop.rideloop.entity.Role;
import com.rideloop.rideloop.entity.User;
import com.rideloop.rideloop.exception.ResourceNotFoundException;
import com.rideloop.rideloop.exception.UserAlreadyExistsException;
import com.rideloop.rideloop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Password and Confirm Password do not match!");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new UserAlreadyExistsException("This email is already registered: " + normalizedEmail);
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        Role userRole = Role.PASSENGER;
        if (request.getRole() != null && request.getRole().equalsIgnoreCase("DRIVER")) {
            userRole = Role.DRIVER;
        }

        User userToSave;
        if (userRole == Role.DRIVER) {
            Driver driver = new Driver(
                    request.getFullName().trim(),
                    normalizedEmail,
                    request.getPhone().trim(),
                    hashedPassword,
                    request.getLicenseNumber(),
                    request.getVehicleModel(),
                    request.getVehicleNumber()
            );
            userToSave = driver;
        } else {
            Passenger passenger = new Passenger(
                    request.getFullName().trim(),
                    normalizedEmail,
                    request.getPhone().trim(),
                    hashedPassword,
                    request.getPhone()
            );
            userToSave = passenger;
        }

        User savedUser = userRepository.save(userToSave);

        return new AuthResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                savedUser.getRole(),
                "Registration successful"
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                "Login successful"
        );
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }
}
