package com.rideloop.rideloop.config;

import com.rideloop.rideloop.entity.*;
import com.rideloop.rideloop.repository.RideRepository;
import com.rideloop.rideloop.repository.SubscriptionRepository;
import com.rideloop.rideloop.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Pre-populates sample drivers, passenger, and rides on startup so that
 * all frontend views and REST APIs work immediately.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(UserRepository userRepository,
                           RideRepository rideRepository,
                           SubscriptionRepository subscriptionRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized with data. Skipping data seeding.");
            return;
        }

        log.info("Seeding initial Routiva demo data...");

        String defaultHashedPassword = passwordEncoder.encode("password123");

        // 1. Create Drivers with diverse vehicle types (Cars, Bikes, SUVs, EVs)
        Driver rahul = new Driver(
                "Rahul Patel",
                "rahul.patel@gmail.com",
                "9876543210",
                defaultHashedPassword,
                "GJ-01-2022-0012345",
                "Maruti Swift",
                "GJ 01 AB 1234"
        );

        Driver amit = new Driver(
                "Amit Shah",
                "amit.shah@gmail.com",
                "9823456789",
                defaultHashedPassword,
                "GJ-01-2021-0098765",
                "Hyundai i20",
                "GJ 01 CD 5678"
        );

        Driver neha = new Driver(
                "Neha Desai",
                "neha.desai@gmail.com",
                "9898989898",
                defaultHashedPassword,
                "GJ-01-2023-0054321",
                "Tata Nexon EV",
                "GJ 01 EF 9012"
        );

        Driver vikram = new Driver(
                "Vikram Singh",
                "vikram.singh@gmail.com",
                "9876511223",
                defaultHashedPassword,
                "GJ-01-2020-0088990",
                "Royal Enfield Classic 350",
                "GJ 01 GH 3456"
        );

        Driver karan = new Driver(
                "Karan Joshi",
                "karan.joshi@gmail.com",
                "9898123456",
                defaultHashedPassword,
                "GJ-01-2024-0011223",
                "Toyota Innova Crysta",
                "GJ 01 JK 7890"
        );

        Driver harsh = new Driver(
                "Harsh Mehta",
                "harsh.mehta@gmail.com",
                "9822334455",
                defaultHashedPassword,
                "GJ-01-2023-0044556",
                "Hero Splendor Plus",
                "GJ 01 LM 5566"
        );

        userRepository.save(rahul);
        userRepository.save(amit);
        userRepository.save(neha);
        userRepository.save(vikram);
        userRepository.save(karan);
        userRepository.save(harsh);

        // 2. Create Passenger with Wallet Balance
        Passenger priyanshi = new Passenger(
                "Priyanshi Patel",
                "priyanshi@gmail.com",
                "9123456780",
                defaultHashedPassword,
                "9876543210"
        );
        priyanshi.setWalletBalance(500.0);
        userRepository.save(priyanshi);

        // 3. Create Sample Rides Across Normal Routes with Multiple Vehicle Options
        LocalDate today = LocalDate.now();
        LocalDate targetDate = LocalDate.of(2026, 11, 25);

        // --- Route 1: Ahmedabad to Gandhinagar (Daily Office/College Commute) ---
        // Option A: Car (Swift)
        Ride ride1 = new Ride(
                rahul, "Ahmedabad", "Gandhinagar", targetDate,
                "08:00 AM", "Maruti Swift", "CAR", 4, 3, 100.0
        );

        // Option B: Car (i20)
        Ride ride2 = new Ride(
                amit, "Ahmedabad", "Gandhinagar", targetDate,
                "09:30 AM", "Hyundai i20", "CAR", 4, 2, 120.0
        );

        // Option C: Bike (Royal Enfield - Fast & Economical!)
        Ride ride3 = new Ride(
                vikram, "Ahmedabad", "Gandhinagar", targetDate,
                "08:15 AM", "Royal Enfield Classic 350", "BIKE", 1, 1, 60.0
        );

        // Option D: Electric Vehicle (Tata Nexon EV - Eco Friendly!)
        Ride ride4 = new Ride(
                neha, "Ahmedabad", "Gandhinagar", targetDate,
                "10:00 AM", "Tata Nexon EV", "EV", 4, 3, 110.0
        );

        // Option E: SUV (Innova - Extra Comfort & Bags)
        Ride ride5 = new Ride(
                karan, "Ahmedabad", "Gandhinagar", targetDate,
                "07:30 AM", "Toyota Innova Crysta", "SUV", 6, 5, 150.0
        );

        // --- Route 2: Bavla to Ahmedabad (Normal Suburb Route) ---
        Ride ride6 = new Ride(
                rahul, "Bavla", "Ahmedabad", targetDate,
                "08:30 AM", "Maruti Swift", "CAR", 4, 3, 80.0
        );
        Ride ride7 = new Ride(
                harsh, "Bavla", "Ahmedabad", targetDate,
                "09:00 AM", "Hero Splendor Plus", "BIKE", 1, 1, 40.0
        );

        // --- Route 3: SG Highway to Infocity (Daily Tech Corridor) ---
        Ride ride8 = new Ride(
                amit, "SG Highway", "Infocity", targetDate,
                "08:45 AM", "Hyundai i20", "CAR", 4, 3, 90.0
        );
        Ride ride9 = new Ride(
                vikram, "SG Highway", "Infocity", targetDate,
                "09:15 AM", "Royal Enfield Classic 350", "BIKE", 1, 1, 50.0
        );

        // --- Route 4: Ahmedabad to Vadodara (Intercity Commute) ---
        Ride ride10 = new Ride(
                karan, "Ahmedabad", "Vadodara", targetDate,
                "06:30 AM", "Toyota Innova Crysta", "SUV", 6, 4, 220.0
        );

        rideRepository.save(ride1);
        rideRepository.save(ride2);
        rideRepository.save(ride3);
        rideRepository.save(ride4);
        rideRepository.save(ride5);
        rideRepository.save(ride6);
        rideRepository.save(ride7);
        rideRepository.save(ride8);
        rideRepository.save(ride9);
        rideRepository.save(ride10);

        // 4. Create Initial Active Subscription for Passenger
        Subscription sub = new Subscription(
                priyanshi,
                "FREE PLAN",
                0.0,
                today,
                today.plusDays(30),
                "ACTIVE"
        );
        subscriptionRepository.save(sub);

        log.info("Routiva demo data seeded successfully: 6 Drivers, 10 Diverse Rides (Cars, Bikes, SUVs, EVs), 1 Passenger (Wallet: Rs. 500).");
    }
}
