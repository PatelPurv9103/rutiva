package com.rideloop.rideloop.controller;

import com.rideloop.rideloop.dto.ApiResponse;
import com.rideloop.rideloop.dto.AuthResponse;
import com.rideloop.rideloop.dto.LoginRequest;
import com.rideloop.rideloop.dto.SignupRequest;
import com.rideloop.rideloop.entity.User;
import com.rideloop.rideloop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> signup(@Valid @RequestBody SignupRequest request) {
        AuthResponse response = userService.signup(request);
        return new ResponseEntity<>(ApiResponse.success("Account created successfully", response), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ApiResponse<User>> getUserProfile(@PathVariable Long id) {
        User user = userService.getUserById(id);
        // Do not return password hash
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("User profile fetched", user));
    }
}
