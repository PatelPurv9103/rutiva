package com.rideloop.rideloop.service;

import com.rideloop.rideloop.entity.Booking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Service demonstrating Java File Handling requirement (Section 8.F).
 * Covers CSV export, writing receipts to file, and reading stored receipt files.
 */
@Service
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Value("${rideloop.storage.export-dir:./exports}")
    private String exportDir;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * Generates a CSV file containing the user's booking history.
     */
    public byte[] exportBookingsToCsv(List<Booking> bookings) {
        StringBuilder csv = new StringBuilder();
        csv.append("Booking ID,Ride ID,Driver,From,To,Travel Date,Departure Time,Vehicle,Seats Booked,Total Fare (INR),Status,Booking Date\n");

        for (Booking b : bookings) {
            String driverName = (b.getRide() != null && b.getRide().getDriver() != null)
                    ? b.getRide().getDriver().getFullName() : "N/A";
            String from = (b.getRide() != null) ? b.getRide().getFromLocation() : "N/A";
            String to = (b.getRide() != null) ? b.getRide().getToLocation() : "N/A";
            String travelDate = (b.getRide() != null && b.getRide().getTravelDate() != null)
                    ? b.getRide().getTravelDate().toString() : "N/A";
            String departure = (b.getRide() != null) ? b.getRide().getDepartureTime() : "N/A";
            String vehicle = (b.getRide() != null && b.getRide().getVehicleName() != null)
                    ? b.getRide().getVehicleName() : "N/A";

            csv.append(escapeSpecialCharacters(String.valueOf(b.getId()))).append(",")
               .append(escapeSpecialCharacters(b.getRide() != null ? String.valueOf(b.getRide().getId()) : "N/A")).append(",")
               .append(escapeSpecialCharacters(driverName)).append(",")
               .append(escapeSpecialCharacters(from)).append(",")
               .append(escapeSpecialCharacters(to)).append(",")
               .append(escapeSpecialCharacters(travelDate)).append(",")
               .append(escapeSpecialCharacters(departure)).append(",")
               .append(escapeSpecialCharacters(vehicle)).append(",")
               .append(b.getSeatsBooked()).append(",")
               .append(b.getTotalFare()).append(",")
               .append(b.getBookingStatus()).append(",")
               .append(b.getBookingDate() != null ? b.getBookingDate().format(DATE_TIME_FORMATTER) : "N/A")
               .append("\n");
        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    /**
     * Saves a booking receipt to local filesystem.
     */
    public String saveBookingReceiptToFile(Booking booking) {
        try {
            Path directoryPath = Paths.get(exportDir);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            String filename = "receipt_booking_" + booking.getId() + ".txt";
            Path filePath = directoryPath.resolve(filename);

            String receiptContent = "========================================================\n" +
                    "                   ROUTIVA BOOKING RECEIPT             \n" +
                    "========================================================\n" +
                    "Booking ID     : " + booking.getId() + "\n" +
                    "Passenger Name : " + booking.getPassenger().getFullName() + "\n" +
                    "Passenger Email: " + booking.getPassenger().getEmail() + "\n" +
                    "Passenger Phone: " + booking.getPassenger().getPhone() + "\n" +
                    "Driver Name    : " + booking.getRide().getDriver().getFullName() + "\n" +
                    "Vehicle        : " + booking.getRide().getVehicleName() + "\n" +
                    "Route          : " + booking.getRide().getFromLocation() + " -> " + booking.getRide().getToLocation() + "\n" +
                    "Travel Date    : " + booking.getRide().getTravelDate() + "\n" +
                    "Departure Time : " + booking.getRide().getDepartureTime() + "\n" +
                    "Seats Booked   : " + booking.getSeatsBooked() + "\n" +
                    "Fare Per Seat  : Rs. " + booking.getRide().getPricePerSeat() + "\n" +
                    "Total Fare     : Rs. " + booking.getTotalFare() + "\n" +
                    "Status         : " + booking.getBookingStatus() + "\n" +
                    "Booking Time   : " + booking.getBookingDate().format(DATE_TIME_FORMATTER) + "\n" +
                    "========================================================\n" +
                    "Thank you for choosing Routiva! Safe travels.\n";

            Files.writeString(filePath, receiptContent, StandardCharsets.UTF_8);
            logger.info("Saved booking receipt file to: {}", filePath.toAbsolutePath());
            return filePath.toAbsolutePath().toString();
        } catch (IOException e) {
            logger.error("Failed to write booking receipt to file: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Reads a generated receipt file from disk.
     */
    public String readBookingReceiptFile(String filename) {
        try {
            Path filePath = Paths.get(exportDir).resolve(filename);
            if (!Files.exists(filePath)) {
                throw new FileNotFoundException("Receipt file not found: " + filename);
            }
            return Files.readString(filePath, StandardCharsets.UTF_8);
        } catch (IOException e) {
            logger.error("Failed to read receipt file {}: {}", filename, e.getMessage());
            return "Error reading receipt: " + e.getMessage();
        }
    }

    private String escapeSpecialCharacters(String data) {
        if (data == null) {
            return "";
        }
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
