package com.rideloop.rideloop.service;

import com.rideloop.rideloop.dto.AuthResponse;
import com.rideloop.rideloop.dto.LoginRequest;
import com.rideloop.rideloop.dto.SignupRequest;
import com.rideloop.rideloop.entity.User;

public interface UserService {
    AuthResponse signup(SignupRequest request);
    AuthResponse login(LoginRequest request);
    User getUserById(Long id);
}
