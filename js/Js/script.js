// ========================================================
// Routiva - Full-Stack REST API & Fallback Client Script
// API Base URL: http://localhost:8080/api
// ========================================================

const API_BASE_URL = "http://localhost:8080/api";

// Fallback rides matching Spring Boot DataInitializer (Cars, Bikes, SUVs, EVs)
const FALLBACK_RIDES = [
    {
        id: 1,
        driverId: 1,
        driverName: "Rahul Patel",
        driverPhone: "9876543210",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "08:00 AM",
        vehicleName: "Maruti Swift",
        vehicleType: "CAR",
        totalSeats: 4,
        availableSeats: 3,
        pricePerSeat: 100.0,
        status: "AVAILABLE"
    },
    {
        id: 2,
        driverId: 2,
        driverName: "Amit Shah",
        driverPhone: "9823456789",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "09:30 AM",
        vehicleName: "Hyundai i20",
        vehicleType: "CAR",
        totalSeats: 4,
        availableSeats: 2,
        pricePerSeat: 120.0,
        status: "AVAILABLE"
    },
    {
        id: 3,
        driverId: 4,
        driverName: "Vikram Singh",
        driverPhone: "9876511223",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "08:15 AM",
        vehicleName: "Royal Enfield Classic 350",
        vehicleType: "BIKE",
        totalSeats: 1,
        availableSeats: 1,
        pricePerSeat: 60.0,
        status: "AVAILABLE"
    },
    {
        id: 4,
        driverId: 3,
        driverName: "Neha Desai",
        driverPhone: "9898989898",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "10:00 AM",
        vehicleName: "Tata Nexon EV",
        vehicleType: "EV",
        totalSeats: 4,
        availableSeats: 3,
        pricePerSeat: 110.0,
        status: "AVAILABLE"
    },
    {
        id: 5,
        driverId: 5,
        driverName: "Karan Joshi",
        driverPhone: "9898123456",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "07:30 AM",
        vehicleName: "Toyota Innova Crysta",
        vehicleType: "SUV",
        totalSeats: 6,
        availableSeats: 5,
        pricePerSeat: 150.0,
        status: "AVAILABLE"
    },
    {
        id: 6,
        driverId: 6,
        driverName: "Harsh Mehta",
        driverPhone: "9822334455",
        fromLocation: "Bavla",
        toLocation: "Ahmedabad",
        travelDate: "2026-11-25",
        departureTime: "08:00 AM",
        vehicleName: "Hero Splendor Plus",
        vehicleType: "BIKE",
        totalSeats: 1,
        availableSeats: 1,
        pricePerSeat: 40.0,
        status: "AVAILABLE"
    },
    {
        id: 7,
        driverId: 1,
        driverName: "Rahul Patel",
        driverPhone: "9876543210",
        fromLocation: "Bavla",
        toLocation: "Ahmedabad",
        travelDate: "2026-11-25",
        departureTime: "08:30 AM",
        vehicleName: "Maruti Swift",
        vehicleType: "CAR",
        totalSeats: 4,
        availableSeats: 3,
        pricePerSeat: 80.0,
        status: "AVAILABLE"
    },
    {
        id: 8,
        driverId: 3,
        driverName: "Neha Desai",
        driverPhone: "9898989898",
        fromLocation: "SG Highway",
        toLocation: "Infocity",
        travelDate: "2026-11-25",
        departureTime: "09:00 AM",
        vehicleName: "Tata Nexon EV",
        vehicleType: "EV",
        totalSeats: 4,
        availableSeats: 3,
        pricePerSeat: 70.0,
        status: "AVAILABLE"
    },
    {
        id: 9,
        driverId: 4,
        driverName: "Vikram Singh",
        driverPhone: "9876511223",
        fromLocation: "SG Highway",
        toLocation: "Infocity",
        travelDate: "2026-11-25",
        departureTime: "08:45 AM",
        vehicleName: "Royal Enfield Classic 350",
        vehicleType: "BIKE",
        totalSeats: 1,
        availableSeats: 1,
        pricePerSeat: 45.0,
        status: "AVAILABLE"
    },
    {
        id: 10,
        driverId: 5,
        driverName: "Karan Joshi",
        driverPhone: "9898123456",
        fromLocation: "Ahmedabad",
        toLocation: "Vadodara",
        travelDate: "2026-11-25",
        departureTime: "06:30 AM",
        vehicleName: "Toyota Innova Crysta",
        vehicleType: "SUV",
        totalSeats: 6,
        availableSeats: 4,
        pricePerSeat: 200.0,
        status: "AVAILABLE"
    }
];

// Helper: Get currently logged-in user from localStorage
function getCurrentUser() {
    try {
        const u = JSON.parse(localStorage.getItem("rideLoopCurrentUser"));
        if (u) return u;
    } catch (e) {}
    // Default logged in user (Passenger with ₹500 wallet)
    const defaultUser = {
        id: 4,
        fullName: "Priyanshi Patel",
        email: "priyanshi@gmail.com",
        phone: "9123456780",
        role: "PASSENGER",
        walletBalance: 500.0
    };
    localStorage.setItem("rideLoopCurrentUser", JSON.stringify(defaultUser));
    return defaultUser;
}

function setCurrentUser(user) {
    localStorage.setItem("rideLoopCurrentUser", JSON.stringify(user));
}

// Helper: Wallet balance getter & setter
function getUserWalletBalance() {
    const stored = localStorage.getItem("routivaWalletBalance");
    if (stored !== null) {
        return parseFloat(stored);
    }
    const user = getCurrentUser();
    const bal = (user && user.walletBalance !== undefined) ? user.walletBalance : 500.0;
    localStorage.setItem("routivaWalletBalance", bal.toString());
    return bal;
}

function setUserWalletBalance(amount) {
    const bal = Math.max(0, Math.round(amount * 100) / 100);
    localStorage.setItem("routivaWalletBalance", bal.toString());
    const user = getCurrentUser();
    if (user) {
        user.walletBalance = bal;
        setCurrentUser(user);
    }
    return bal;
}

function logout() {
    localStorage.removeItem("rideLoopCurrentUser");
    window.location.href = "welcome.html";
}

// ========================================================
// 1. GLOBAL NAVIGATION & AUTH
// ========================================================

document.addEventListener("DOMContentLoaded", function () {
    const currentUser = getCurrentUser();

    // Render User Header Profile / Avatar with "P" badge
    const profileAvatars = document.querySelectorAll(".profile-avatar, .my-profile-avatar");
    profileAvatars.forEach(avatar => {
        if (currentUser) {
            const initial = currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "P";
            avatar.innerHTML = `
                <div style="position:relative;display:inline-block;">
                    <div style="display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:#2563eb;color:#ffffff;font-weight:700;font-size:1.1rem;box-shadow:0 2px 5px rgba(0,0,0,0.15);cursor:pointer;" title="${currentUser.fullName} - Click to Log out">
                        ${initial}
                    </div>
                </div>`;
            avatar.onclick = () => {
                if (confirm(`👤 Logged in as: ${currentUser.fullName}\n📧 ${currentUser.email}\n💰 Wallet Balance: ₹${getUserWalletBalance().toFixed(2)}\n\nDo you want to log out?`)) {
                    logout();
                }
            };
        } else {
            avatar.innerHTML = `
                <img src="images/profile-avatar.png" alt="Profile" style="width:42px;height:42px;border-radius:50%;cursor:pointer;" onclick="window.location.href='login.html'" title="Click to Login">
            `;
        }
    });

    // Initialize Page-Specific Handlers
    initLoginPage();
    initSignupPage();
    initSearchRidePage();
    initAvailableRidesPage();
    initBookingPage();
    initMyRidesPage();
    initSubscriptionPage();
    initAboutPage();
});

// ========================================================
// 2. LOGIN PAGE (REST API: POST /api/auth/login)
// ========================================================

function initLoginPage() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setCurrentUser(result.data);
                if (result.data.walletBalance !== undefined) {
                    setUserWalletBalance(result.data.walletBalance);
                }
                alert(`Welcome back, ${result.data.fullName}!`);
                window.location.href = "index.html";
                return;
            } else {
                alert(result.message || "Invalid email or password.");
                return;
            }
        } catch (error) {
            console.warn("Backend API unreachable, checking demo storage:", error);
            const user = {
                id: 4,
                fullName: "Priyanshi Patel",
                email: email,
                phone: "9123456780",
                role: "PASSENGER",
                walletBalance: getUserWalletBalance()
            };
            setCurrentUser(user);
            alert(`Welcome back, Priyanshi Patel!`);
            window.location.href = "index.html";
        }
    });
}

// ========================================================
// 3. SIGNUP PAGE (REST API: POST /api/auth/signup)
// ========================================================

function initSignupPage() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please verify.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    password,
                    confirmPassword,
                    role: "PASSENGER"
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setCurrentUser(result.data);
                setUserWalletBalance(500.0);
                alert("Account created successfully! ₹500 Welcome Wallet Balance Added.");
                window.location.href = "index.html";
                return;
            } else {
                alert(result.message || "Registration failed. Email may already be in use.");
                return;
            }
        } catch (error) {
            console.warn("Backend API unreachable, using local storage:", error);
            const newUser = {
                id: Date.now(),
                fullName,
                email,
                phone,
                role: "PASSENGER",
                walletBalance: 500.0
            };
            setCurrentUser(newUser);
            setUserWalletBalance(500.0);
            alert("Account created successfully! ₹500 Welcome Wallet Balance Added.");
            window.location.href = "index.html";
        }
    });
}

// ========================================================
// 4. SEARCH RIDE PAGE
// ========================================================

function initSearchRidePage() {
    const searchRideForm = document.getElementById("searchRideForm");
    if (!searchRideForm) return;

    const dateInput = document.getElementById("travelDate");
    if (dateInput) {
        dateInput.value = "2026-11-25";
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    searchRideForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const from = document.getElementById("from").value.trim();
        const to = document.getElementById("to").value.trim();
        const travelDate = document.getElementById("travelDate").value;
        const seats = document.getElementById("seats").value;
        const vehicleTypeSelect = document.getElementById("vehicleType");
        const vehicleType = vehicleTypeSelect ? vehicleTypeSelect.value : "ALL";

        if (from.toLowerCase() === to.toLowerCase()) {
            alert("Starting point and destination cannot be the same.");
            return;
        }

        const params = new URLSearchParams({
            from: from,
            to: to,
            date: travelDate,
            seats: seats,
            vehicleType: vehicleType
        });

        window.location.href = "rides.html?" + params.toString();
    });
}

// ========================================================
// 5. AVAILABLE RIDES PAGE (Category Tabs & Multi-Vehicle Options)
// ========================================================

let allFetchedRides = [];
let currentCategoryFilter = "ALL";

async function initAvailableRidesPage() {
    const ridesPage = document.querySelector(".available-section");
    if (!ridesPage) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const seats = parseInt(params.get("seats")) || 1;
    const initialVehicleType = params.get("vehicleType") || "ALL";

    currentCategoryFilter = initialVehicleType;

    const displayFrom = document.getElementById("displayFrom");
    const displayTo = document.getElementById("displayTo");
    const displayDate = document.getElementById("displayDate");

    if (from && displayFrom) displayFrom.textContent = from;
    if (to && displayTo) displayTo.textContent = to;
    if (date && displayDate) {
        displayDate.textContent = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    const ridesContainer = document.getElementById("ridesContainer");
    if (!ridesContainer) return;

    ridesContainer.innerHTML = `<div style="text-align:center;padding:40px;font-size:1.1rem;color:#4b5563;">Searching rides for all vehicle options...</div>`;

    // Attempt live Spring Boot backend first
    try {
        let url = `${API_BASE_URL}/rides`;
        if (from && to && date) {
            url = `${API_BASE_URL}/rides/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&seats=${seats}`;
        }
        const response = await fetch(url);
        const result = await response.json();
        if (result && result.data && result.data.length > 0) {
            allFetchedRides = result.data;
        } else {
            allFetchedRides = filterFallbackRides(from, to, seats);
        }
    } catch (error) {
        console.warn("Backend API unreachable, using pre-seeded fallback rides with Cars, Bikes, SUVs, EVs:", error);
        allFetchedRides = filterFallbackRides(from, to, seats);
    }

    // Setup Category Tabs
    setupVehicleCategoryTabs(seats);
    renderFilteredRides(seats);
}

function filterFallbackRides(from, to, seats) {
    if (from && to) {
        const matches = FALLBACK_RIDES.filter(r =>
            r.fromLocation.toLowerCase() === from.toLowerCase() &&
            r.toLocation.toLowerCase() === to.toLowerCase() &&
            r.availableSeats >= seats
        );
        return matches.length > 0 ? matches : FALLBACK_RIDES;
    }
    return FALLBACK_RIDES;
}

function setupVehicleCategoryTabs(seats) {
    const tabs = document.querySelectorAll(".vehicle-tab");

    // Update Counts
    const countAll = allFetchedRides.length;
    const countCar = allFetchedRides.filter(r => (r.vehicleType || "CAR") === "CAR").length;
    const countBike = allFetchedRides.filter(r => (r.vehicleType || "").toUpperCase() === "BIKE").length;
    const countSuv = allFetchedRides.filter(r => (r.vehicleType || "").toUpperCase() === "SUV").length;
    const countEv = allFetchedRides.filter(r => (r.vehicleType || "").toUpperCase() === "EV").length;

    const elAll = document.getElementById("countAll");
    const elCar = document.getElementById("countCar");
    const elBike = document.getElementById("countBike");
    const elSuv = document.getElementById("countSuv");
    const elEv = document.getElementById("countEv");

    if (elAll) elAll.textContent = countAll;
    if (elCar) elCar.textContent = countCar;
    if (elBike) elBike.textContent = countBike;
    if (elSuv) elSuv.textContent = countSuv;
    if (elEv) elEv.textContent = countEv;

    tabs.forEach(tab => {
        const type = tab.getAttribute("data-type");
        if (type === currentCategoryFilter) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }

        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentCategoryFilter = type;
            renderFilteredRides(seats);
        };
    });
}

function renderFilteredRides(seats) {
    const ridesContainer = document.getElementById("ridesContainer");
    if (!ridesContainer) return;

    let filtered = allFetchedRides;
    if (currentCategoryFilter !== "ALL") {
        filtered = allFetchedRides.filter(r => (r.vehicleType || "CAR").toUpperCase() === currentCategoryFilter.toUpperCase());
    }

    if (filtered.length === 0) {
        ridesContainer.innerHTML = `
            <div class="empty-rides" style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:12px;">🚘</div>
                <h3>No rides available for this vehicle category</h3>
                <p style="color:#6b7280;margin:10px 0 20px;">Try selecting "All Vehicles" or choose another date/route.</p>
                <button type="button" class="vehicle-tab active" onclick="document.querySelector('[data-type=\\'ALL\\']').click()">Show All Available Vehicles</button>
            </div>`;
        return;
    }

    ridesContainer.innerHTML = "";
    filtered.forEach(ride => {
        const vType = (ride.vehicleType || "CAR").toUpperCase();
        let badgeClass = "car";
        let icon = "🚗";
        if (vType === "BIKE") { badgeClass = "bike"; icon = "🏍️"; }
        else if (vType === "SUV") { badgeClass = "suv"; icon = "🚙"; }
        else if (vType === "EV") { badgeClass = "ev"; icon = "⚡"; }

        const card = document.createElement("div");
        card.className = "ride-card";
        card.innerHTML = `
            <div class="ride-top">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                        <h2>${escapeHtml(ride.driverName)}</h2>
                        <span class="vehicle-tag ${badgeClass}">${icon} ${vType}</span>
                    </div>
                    <p>${escapeHtml(ride.vehicleName || "Vehicle")} • Route: <strong>${escapeHtml(ride.fromLocation)} → ${escapeHtml(ride.toLocation)}</strong></p>
                </div>
                <div style="text-align:right;">
                    <span class="ride-status" style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-weight:600;font-size:0.85rem;display:inline-block;margin-bottom:6px;">Available</span>
                    <br>
                    <span class="pay-after-pill">🛡️ Pay After Ride</span>
                </div>
            </div>
            <div class="ride-details">
                <div>
                    <span>Departure</span>
                    <h3>${escapeHtml(ride.departureTime)}</h3>
                </div>
                <div>
                    <span>Available Seats</span>
                    <h3>${ride.availableSeats} ${vType === 'BIKE' ? 'Pillion Seat' : 'Seats'}</h3>
                </div>
                <div>
                    <span>Price / Seat</span>
                    <h3 style="color:#2563eb;">₹${ride.pricePerSeat}</h3>
                </div>
            </div>
            <button class="book-button" onclick="selectAndBookRide(${ride.id}, ${seats})">
                Book This Ride →
            </button>
        `;
        ridesContainer.appendChild(card);
    });
}

function selectAndBookRide(rideId, seats) {
    window.location.href = `booking.html?rideId=${rideId}&seats=${seats || 1}`;
}

// ========================================================
// 6. BOOKING PAGE (Multi-Day Selection & Pay-After-Ride Wallet)
// ========================================================

let bookingRideData = null;

async function initBookingPage() {
    const bookingForm = document.getElementById("bookingForm");
    if (!bookingForm) return;

    const params = new URLSearchParams(window.location.search);
    const rideId = params.get("rideId") || "1";
    const requestedSeats = parseInt(params.get("seats")) || 1;

    const currentUser = getCurrentUser();
    const currentWallet = getUserWalletBalance();

    const nameInput = document.getElementById("passengerName");
    const emailInput = document.getElementById("passengerEmail");
    const phoneInput = document.getElementById("passengerPhone");
    const seatsSelect = document.getElementById("bookingSeats");
    const walletDisplay = document.getElementById("walletBalanceDisplay");

    if (currentUser) {
        if (nameInput) nameInput.value = currentUser.fullName || "";
        if (emailInput) emailInput.value = currentUser.email || "";
        if (phoneInput) phoneInput.value = currentUser.phone || "";
    }

    if (walletDisplay) {
        walletDisplay.textContent = `💰 Wallet Balance: ₹${currentWallet.toFixed(2)}`;
    }

    if (seatsSelect) {
        seatsSelect.value = requestedSeats.toString();
    }

    // Fetch ride details
    try {
        const response = await fetch(`${API_BASE_URL}/rides/${rideId}`);
        const result = await response.json();
        if (result && result.data) {
            bookingRideData = result.data;
        } else {
            bookingRideData = FALLBACK_RIDES.find(r => r.id === parseInt(rideId)) || FALLBACK_RIDES[0];
        }
    } catch (err) {
        bookingRideData = FALLBACK_RIDES.find(r => r.id === parseInt(rideId)) || FALLBACK_RIDES[0];
    }

    // Render Ride Details Box
    renderSelectedRideBox(bookingRideData);

    // Setup Commute Day Checkboxes and Fare Calculation
    setupCommuteDaysAndFare(bookingRideData);

    // Handle Form Submit
    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const seats = parseInt(seatsSelect ? seatsSelect.value : "1");

        // Selected Commute Days
        const checkedDayEls = document.querySelectorAll("input[name='commuteDay']:checked");
        const selectedDaysList = Array.from(checkedDayEls).map(el => el.value);
        if (selectedDaysList.length === 0) {
            alert("Please select at least 1 travel day for your ride.");
            return;
        }
        const selectedDaysStr = selectedDaysList.join(", ");

        // Selected Payment Method
        const paymentRadio = document.querySelector("input[name='paymentMethod']:checked");
        const paymentMethod = paymentRadio ? paymentRadio.value : "WALLET_AFTER_RIDE";

        // Calculate final fare
        const daysCount = selectedDaysList.length;
        const subtotal = bookingRideData.pricePerSeat * seats * daysCount;
        const discount = daysCount >= 3 ? Math.round(subtotal * 0.10) : 0;
        const finalFare = subtotal - discount;

        const payload = {
            rideId: parseInt(rideId),
            passengerId: currentUser ? currentUser.id : 4,
            passengerName: name,
            passengerEmail: email,
            passengerPhone: phone,
            seatsBooked: seats,
            paymentMethod: paymentMethod,
            selectedDays: selectedDaysStr
        };

        const submitBtn = bookingForm.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Confirming Reservation...";
        }

        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                alert(`🎉 Booking Confirmed!\n\nBooking ID: #${result.data.id}\nDriver: ${result.data.driverName}\nRoute: ${result.data.fromLocation} → ${result.data.toLocation}\nDays: ${selectedDaysStr}\nTotal Fare: ₹${result.data.totalFare}\n\n🛡️ Pay After Ride Protected:\n₹0 deducted now. Fare will be safely deducted after trip is marked completed!`);
                window.location.href = "my-rides.html";
                return;
            }
        } catch (error) {
            console.warn("Backend API offline, saving to demo storage:", error);
            const demoBooking = {
                id: Date.now(),
                rideId: parseInt(rideId),
                passengerId: currentUser ? currentUser.id : 4,
                driverName: bookingRideData.driverName,
                fromLocation: bookingRideData.fromLocation,
                toLocation: bookingRideData.toLocation,
                travelDate: bookingRideData.travelDate,
                departureTime: bookingRideData.departureTime,
                vehicleName: bookingRideData.vehicleName,
                vehicleType: bookingRideData.vehicleType || "CAR",
                seatsBooked: seats,
                selectedDays: selectedDaysStr,
                paymentMethod: paymentMethod,
                paymentStatus: "PENDING_COMPLETION",
                totalFare: finalFare,
                bookingStatus: "CONFIRMED",
                bookingDate: new Date().toISOString()
            };

            const storedBookings = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
            storedBookings.unshift(demoBooking);
            localStorage.setItem("rideLoopBookings", JSON.stringify(storedBookings));

            alert(`🎉 Booking Confirmed (Demo)!\n\nBooking ID: #${demoBooking.id}\nDriver: ${demoBooking.driverName}\nRoute: ${demoBooking.fromLocation} → ${demoBooking.toLocation}\nDays: ${selectedDaysStr}\nTotal Fare: ₹${finalFare}\n\n🛡️ Pay After Ride Protected:\n₹0 deducted now. Fare will be safely deducted after trip is completed!`);
            window.location.href = "my-rides.html";
        }
    });
}

function renderSelectedRideBox(ride) {
    const container = document.getElementById("selectedRideDetails");
    if (!container || !ride) return;

    const vType = (ride.vehicleType || "CAR").toUpperCase();
    let badgeClass = "car";
    let icon = "🚗";
    if (vType === "BIKE") { badgeClass = "bike"; icon = "🏍️"; }
    else if (vType === "SUV") { badgeClass = "suv"; icon = "🚙"; }
    else if (vType === "EV") { badgeClass = "ev"; icon = "⚡"; }

    container.innerHTML = `
        <div class="driver-info">
            <div class="driver-avatar">${ride.driverName ? ride.driverName.split(" ").map(n=>n[0]).join("") : "RP"}</div>
            <div>
                <h3>${escapeHtml(ride.driverName)}</h3>
                <span class="vehicle-tag ${badgeClass}">${icon} ${vType} - ${escapeHtml(ride.vehicleName || "Vehicle")}</span>
            </div>
        </div>
        <div class="booking-route">
            <div class="route-point">
                <span class="route-dot"></span>
                <div>
                    <small>FROM</small>
                    <h3>${escapeHtml(ride.fromLocation)}</h3>
                </div>
            </div>
            <div class="route-line"></div>
            <div class="route-point">
                <span class="route-dot destination-dot"></span>
                <div>
                    <small>TO</small>
                    <h3>${escapeHtml(ride.toLocation)}</h3>
                </div>
            </div>
        </div>
        <div class="ride-info-row">
            <span>Departure Time</span>
            <strong>${escapeHtml(ride.departureTime)}</strong>
        </div>
        <div class="ride-info-row">
            <span>Rate Per Seat</span>
            <strong style="color:#2563eb;">₹${ride.pricePerSeat}</strong>
        </div>
    `;
}

function setupCommuteDaysAndFare(ride) {
    const seatsSelect = document.getElementById("bookingSeats");
    const checkboxes = document.querySelectorAll("input[name='commuteDay']");
    const btnAll = document.getElementById("btnAllWeekdays");
    const btnSingle = document.getElementById("btnSingleDay");

    function updateCalculations() {
        if (!ride) return;
        const seats = parseInt(seatsSelect ? seatsSelect.value : "1") || 1;
        const checkedList = Array.from(document.querySelectorAll("input[name='commuteDay']:checked")).map(el => el.value);
        const daysCount = Math.max(1, checkedList.length);

        const subtotal = ride.pricePerSeat * seats * daysCount;
        const discount = daysCount >= 3 ? Math.round(subtotal * 0.10) : 0;
        const total = subtotal - discount;

        const rateEl = document.getElementById("fareRate");
        const seatsEl = document.getElementById("fareSeats");
        const daysEl = document.getElementById("fareDays");
        const discRow = document.getElementById("discountRow");
        const discAmount = document.getElementById("discountAmount");
        const totalEl = document.getElementById("fareTotalAmount");

        if (rateEl) rateEl.textContent = `₹${ride.pricePerSeat}`;
        if (seatsEl) seatsEl.textContent = `${seats}`;
        if (daysEl) daysEl.textContent = `${daysCount} day${daysCount > 1 ? 's' : ''} (${checkedList.join(', ') || '1 day'})`;

        if (discRow && discAmount) {
            if (discount > 0) {
                discRow.style.display = "flex";
                discAmount.textContent = `-₹${discount}`;
            } else {
                discRow.style.display = "none";
            }
        }

        if (totalEl) totalEl.textContent = `₹${total}`;
    }

    if (seatsSelect) {
        seatsSelect.addEventListener("change", updateCalculations);
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateCalculations);
    });

    if (btnAll) {
        btnAll.addEventListener("click", () => {
            checkboxes.forEach(cb => {
                cb.checked = (cb.value !== "Sat");
            });
            updateCalculations();
        });
    }

    if (btnSingle) {
        btnSingle.addEventListener("click", () => {
            checkboxes.forEach((cb, idx) => {
                cb.checked = (idx === 0);
            });
            updateCalculations();
        });
    }

    updateCalculations();
}

// ========================================================
// 7. MY RIDES PAGE (Wallet, Complete & Pay, Delete Ride, Offer Ride)
// ========================================================

let myRidesData = [];
let currentMyRidesTab = "UPCOMING";

async function initMyRidesPage() {
    const myRidesContainer = document.getElementById("myRidesListContainer");
    if (!myRidesContainer) return;

    const currentUser = getCurrentUser();
    const currentWallet = getUserWalletBalance();

    // Update Wallet Balance Display
    const walletBannerAmount = document.getElementById("userWalletBalance");
    if (walletBannerAmount) {
        walletBannerAmount.textContent = `₹${currentWallet.toFixed(2)}`;
    }

    // CSV Download Link
    const csvExportBtn = document.getElementById("csvExportBtn");
    if (csvExportBtn && currentUser) {
        csvExportBtn.href = `${API_BASE_URL}/bookings/export/csv?passengerId=${currentUser.id}`;
    }

    // Setup Tabs
    const tabUpcoming = document.getElementById("tabUpcoming");
    const tabCompleted = document.getElementById("tabCompleted");
    const tabCancelled = document.getElementById("tabCancelled");

    if (tabUpcoming && tabCompleted && tabCancelled) {
        tabUpcoming.onclick = () => switchMyRidesTab("UPCOMING");
        tabCompleted.onclick = () => switchMyRidesTab("COMPLETED");
        tabCancelled.onclick = () => switchMyRidesTab("CANCELLED");
    }

    // Setup Offer Ride Modal
    setupOfferRideModal();

    // Load Bookings
    await loadMyBookings();
}

async function loadMyBookings() {
    const currentUser = getCurrentUser();
    const myRidesContainer = document.getElementById("myRidesListContainer");

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/my?passengerId=${currentUser.id}`);
        const result = await response.json();
        if (result && result.data) {
            myRidesData = result.data;
        } else {
            myRidesData = getLocalDemoBookings();
        }
    } catch (err) {
        console.warn("Backend API offline, reading local demo bookings:", err);
        myRidesData = getLocalDemoBookings();
    }

    renderMyRidesTabs();
}

function getLocalDemoBookings() {
    const stored = JSON.parse(localStorage.getItem("rideLoopBookings"));
    if (stored && stored.length > 0) return stored;

    const initial = [
        {
            id: 101,
            driverName: "Rahul Patel",
            vehicleName: "Maruti Swift",
            vehicleType: "CAR",
            fromLocation: "Ahmedabad",
            toLocation: "Gandhinagar",
            travelDate: "2026-11-25",
            departureTime: "08:00 AM",
            seatsBooked: 1,
            selectedDays: "Mon, Tue, Wed, Thu, Fri",
            paymentMethod: "WALLET_AFTER_RIDE",
            paymentStatus: "PENDING_COMPLETION",
            totalFare: 450.0,
            bookingStatus: "CONFIRMED"
        },
        {
            id: 102,
            driverName: "Vikram Singh",
            vehicleName: "Royal Enfield Classic 350",
            vehicleType: "BIKE",
            fromLocation: "Ahmedabad",
            toLocation: "Gandhinagar",
            travelDate: "2026-11-25",
            departureTime: "08:15 AM",
            seatsBooked: 1,
            selectedDays: "Mon",
            paymentMethod: "WALLET_AFTER_RIDE",
            paymentStatus: "PENDING_COMPLETION",
            totalFare: 60.0,
            bookingStatus: "CONFIRMED"
        }
    ];
    localStorage.setItem("rideLoopBookings", JSON.stringify(initial));
    return initial;
}

function switchMyRidesTab(tab) {
    currentMyRidesTab = tab;
    document.querySelectorAll(".ride-tabs .ride-tab").forEach(t => t.classList.remove("active"));
    if (tab === "UPCOMING") document.getElementById("tabUpcoming").classList.add("active");
    if (tab === "COMPLETED") document.getElementById("tabCompleted").classList.add("active");
    if (tab === "CANCELLED") document.getElementById("tabCancelled").classList.add("active");
    renderMyRidesTabs();
}

function renderMyRidesTabs() {
    const totalCount = myRidesData.length;
    const upcomingCount = myRidesData.filter(b => b.bookingStatus === "CONFIRMED").length;
    const completedCount = myRidesData.filter(b => b.bookingStatus === "COMPLETED").length;

    const elTotal = document.getElementById("totalRidesCount");
    const elUpcoming = document.getElementById("upcomingRidesCount");
    const elCompleted = document.getElementById("completedRidesCount");

    if (elTotal) elTotal.textContent = totalCount;
    if (elUpcoming) elUpcoming.textContent = upcomingCount;
    if (elCompleted) elCompleted.textContent = completedCount;

    const container = document.getElementById("myRidesListContainer");
    if (!container) return;

    let targetStatus = "CONFIRMED";
    if (currentMyRidesTab === "COMPLETED") targetStatus = "COMPLETED";
    if (currentMyRidesTab === "CANCELLED") targetStatus = "CANCELLED";

    const filtered = myRidesData.filter(b => b.bookingStatus === targetStatus);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-rides" style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:12px;">🚘</div>
                <h3>No ${currentMyRidesTab.toLowerCase()} rides found</h3>
                <p style="color:#6b7280;margin:10px 0 20px;">Explore available rides across Ahmedabad, Gandhinagar, Bavla & more.</p>
                <a href="search.html" class="primary-btn" style="display:inline-block;padding:10px 24px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;">Find a Ride</a>
            </div>`;
        return;
    }

    container.innerHTML = "";
    filtered.forEach(b => {
        const vType = (b.vehicleType || "CAR").toUpperCase();
        let badgeClass = "car";
        let icon = "🚗";
        if (vType === "BIKE") { badgeClass = "bike"; icon = "🏍️"; }
        else if (vType === "SUV") { badgeClass = "suv"; icon = "🚙"; }
        else if (vType === "EV") { badgeClass = "ev"; icon = "⚡"; }

        const card = document.createElement("div");
        card.className = "ride-card";
        card.style.cssText = "margin-bottom:18px;border-left:5px solid " + (b.bookingStatus === 'COMPLETED' ? '#10b981' : b.bookingStatus === 'CANCELLED' ? '#ef4444' : '#2563eb') + ";";

        let paymentPill = `<span style="background:#eff6ff;color:#1e40af;padding:4px 10px;border-radius:12px;font-size:0.8rem;font-weight:600;">💳 Pay After Ride (Pending Completion)</span>`;
        if (b.bookingStatus === "COMPLETED") {
            paymentPill = `<span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:12px;font-size:0.8rem;font-weight:600;">✅ Paid (₹${b.totalFare})</span>`;
        } else if (b.paymentMethod === "CASH_AFTER_RIDE") {
            paymentPill = `<span style="background:#f1f5f9;color:#334155;padding:4px 10px;border-radius:12px;font-size:0.8rem;font-weight:600;">💵 Cash to Driver After Ride</span>`;
        }

        let actionButtons = "";
        if (b.bookingStatus === "CONFIRMED") {
            actionButtons = `
                <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;align-items:center;">
                    <button class="btn-complete-ride" onclick="completeAndPayRide(${b.id}, ${b.totalFare})">
                        ✓ Mark Trip Completed & Pay (₹${b.totalFare})
                    </button>
                    <button class="btn-delete-ride" onclick="deleteMyBooking(${b.id})">
                        🗑️ Delete / Cancel Ride
                    </button>
                    <a href="${API_BASE_URL}/bookings/${b.id}/receipt" target="_blank" style="padding:8px 14px;background:#f8fafc;color:#475569;border-radius:6px;text-decoration:none;font-size:0.85rem;font-weight:600;border:1px solid #cbd5e1;">
                        📄 Receipt
                    </a>
                </div>
            `;
        } else {
            actionButtons = `
                <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;align-items:center;">
                    <a href="${API_BASE_URL}/bookings/${b.id}/receipt" target="_blank" style="padding:8px 14px;background:#f8fafc;color:#475569;border-radius:6px;text-decoration:none;font-size:0.85rem;font-weight:600;border:1px solid #cbd5e1;">
                        📄 View Receipt
                    </a>
                    <button class="btn-delete-ride" onclick="deleteMyBooking(${b.id})" style="background:#64748b;">
                        🗑️ Delete Record
                    </button>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="ride-top">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                        <h2>${escapeHtml(b.driverName || "Driver")}</h2>
                        <span class="vehicle-tag ${badgeClass}">${icon} ${vType}</span>
                        <span style="font-size:0.8rem;color:#64748b;font-weight:600;">Booking #${b.id}</span>
                    </div>
                    <p>${escapeHtml(b.vehicleName || "Vehicle")} • <strong>${escapeHtml(b.fromLocation)} → ${escapeHtml(b.toLocation)}</strong></p>
                    <div style="margin-top:5px;">
                        <span style="font-size:0.82rem;color:#475569;background:#f1f5f9;padding:2px 8px;border-radius:4px;">📅 Days: <strong>${escapeHtml(b.selectedDays || b.travelDate || "Single Trip")}</strong></span>
                    </div>
                </div>
                <div style="text-align:right;">
                    <span class="ride-status" style="background:${b.bookingStatus === 'COMPLETED' ? '#dcfce7' : b.bookingStatus === 'CANCELLED' ? '#fee2e2' : '#dbeafe'};color:${b.bookingStatus === 'COMPLETED' ? '#166534' : b.bookingStatus === 'CANCELLED' ? '#991b1b' : '#1e40af'};padding:4px 12px;border-radius:20px;font-weight:700;font-size:0.85rem;display:inline-block;margin-bottom:6px;">
                        ${b.bookingStatus}
                    </span>
                    <br>
                    ${paymentPill}
                </div>
            </div>
            <div class="ride-details" style="margin-top:14px;">
                <div><span>Date</span><h3>${b.travelDate || 'Today'}</h3></div>
                <div><span>Time</span><h3>${b.departureTime || '08:00 AM'}</h3></div>
                <div><span>Seats</span><h3>${b.seatsBooked} Seat(s)</h3></div>
                <div><span>Total Fare</span><h3 style="color:#2563eb;">₹${b.totalFare}</h3></div>
            </div>
            ${actionButtons}
        `;
        container.appendChild(card);
    });
}

// 7a. Complete Ride & Deduct Wallet ("wallet nu ke paisa ride pachi cut thase")
async function completeAndPayRide(bookingId, totalFare) {
    if (!confirm(`Mark Booking #${bookingId} as Completed?\n\nFare of ₹${totalFare} will now be deducted from your Routiva In-App Wallet.`)) {
        return;
    }

    const currentWallet = getUserWalletBalance();

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/complete`, {
            method: "PUT"
        });
        const result = await response.json();
        if (response.ok && result.success) {
            const newBal = (result.data && result.data.newWalletBalance !== undefined) ? result.data.newWalletBalance : (currentWallet - totalFare);
            setUserWalletBalance(newBal);
            alert(`🎉 Ride Completed Successfully!\n\n₹${totalFare} has been safely deducted from your Routiva Wallet.\nRemaining Wallet Balance: ₹${newBal.toFixed(2)}`);
            await loadMyBookings();
            switchMyRidesTab("COMPLETED");
            return;
        }
    } catch (err) {
        console.warn("Backend API offline, processing wallet deduction locally:", err);
    }

    // Local deduction fallback
    const newBal = setUserWalletBalance(currentWallet - totalFare);
    const stored = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
    const updated = stored.map(b => b.id === bookingId ? { ...b, bookingStatus: "COMPLETED", paymentStatus: "PAID" } : b);
    localStorage.setItem("rideLoopBookings", JSON.stringify(updated));
    myRidesData = updated;

    alert(`🎉 Ride Completed Successfully (Local Demo)!\n\n₹${totalFare} has been deducted from your Routiva Wallet.\nRemaining Wallet Balance: ₹${newBal.toFixed(2)}`);
    const walletBannerAmount = document.getElementById("userWalletBalance");
    if (walletBannerAmount) walletBannerAmount.textContent = `₹${newBal.toFixed(2)}`;
    renderMyRidesTabs();
    switchMyRidesTab("COMPLETED");
}

// 7b. Delete / Cancel Ride ("ride delete nu option")
async function deleteMyBooking(bookingId) {
    if (!confirm(`🗑️ Are you sure you want to Cancel & Delete Booking #${bookingId}?\n\nYour reserved seats will be restored to the driver.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (response.ok && result.success) {
            alert(`🗑️ Booking #${bookingId} has been successfully deleted and cancelled.`);
            await loadMyBookings();
            return;
        }
    } catch (err) {
        console.warn("Backend API offline, removing booking locally:", err);
    }

    // Local removal fallback
    const stored = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
    const updated = stored.filter(b => b.id !== bookingId);
    localStorage.setItem("rideLoopBookings", JSON.stringify(updated));
    myRidesData = updated;

    alert(`🗑️ Booking #${bookingId} has been deleted.`);
    renderMyRidesTabs();
}

// 7c. Driver Offer Ride Modal & Handler
function setupOfferRideModal() {
    const modal = document.getElementById("offerRideModal");
    const openBtn = document.getElementById("openOfferRideBtn");
    const closeBtn = document.getElementById("closeOfferRideBtn");
    const form = document.getElementById("offerRideForm");

    if (!modal || !openBtn || !closeBtn || !form) return;

    openBtn.onclick = () => modal.classList.add("active");
    closeBtn.onclick = () => modal.classList.remove("active");

    const dateInput = document.getElementById("offerDate");
    if (dateInput) {
        dateInput.value = "2026-11-25";
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        const currentUser = getCurrentUser();
        const from = document.getElementById("offerFrom").value.trim();
        const to = document.getElementById("offerTo").value.trim();
        const vehicleType = document.getElementById("offerVehicleType").value;
        const vehicleName = document.getElementById("offerVehicleName").value.trim();
        const seats = parseInt(document.getElementById("offerSeats").value) || 3;
        const price = parseFloat(document.getElementById("offerPrice").value) || 100;
        const date = document.getElementById("offerDate").value;
        const time = document.getElementById("offerTime").value.trim();

        const payload = {
            driverId: currentUser ? currentUser.id : 1,
            fromLocation: from,
            toLocation: to,
            travelDate: date,
            departureTime: time,
            vehicleName: vehicleName,
            vehicleType: vehicleType,
            totalSeats: seats,
            availableSeats: seats,
            pricePerSeat: price
        };

        try {
            const res = await fetch(`${API_BASE_URL}/rides`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (res.ok && result.success) {
                alert(`🚀 Ride Published Successfully!\n\nRoute: ${from} → ${to}\nVehicle: ${vehicleType} (${vehicleName})\nSeats: ${seats}\nPrice: ₹${price}/seat`);
                modal.classList.remove("active");
                form.reset();
                window.location.href = `rides.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&seats=1`;
                return;
            }
        } catch (err) {
            console.warn("Backend offline, saving published ride locally:", err);
        }

        // Fallback local save
        FALLBACK_RIDES.unshift({
            id: Date.now(),
            driverId: currentUser ? currentUser.id : 1,
            driverName: currentUser ? currentUser.fullName : "Rahul Patel",
            driverPhone: "9876543210",
            fromLocation: from,
            toLocation: to,
            travelDate: date,
            departureTime: time,
            vehicleName: vehicleName,
            vehicleType: vehicleType,
            totalSeats: seats,
            availableSeats: seats,
            pricePerSeat: price,
            status: "AVAILABLE"
        });

        alert(`🚀 Ride Published Successfully (Demo)!\n\nRoute: ${from} → ${to}\nVehicle: ${vehicleType} (${vehicleName})\nSeats: ${seats}\nPrice: ₹${price}/seat`);
        modal.classList.remove("active");
        form.reset();
        window.location.href = `rides.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&seats=1`;
    };
}

// ========================================================
// 8. SUBSCRIPTIONS PAGE
// ========================================================

function initSubscriptionPage() {
    const freeBtn = document.querySelector(".free-button");
    const premiumBtn = document.querySelector(".premium-button");

    if (freeBtn) {
        freeBtn.addEventListener("click", async function () {
            const currentUser = getCurrentUser();
            try {
                const response = await fetch(`${API_BASE_URL}/subscriptions/select`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser ? currentUser.id : 4, planName: "FREE PLAN" })
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    alert("✅ You are now enrolled in the Free Membership Plan!");
                    return;
                }
            } catch (err) {}
            alert("✅ You are now enrolled in the Free Membership Plan!");
        });
    }

    if (premiumBtn) {
        premiumBtn.addEventListener("click", function () {
            alert("🌟 Premium Membership Plan is coming soon with priority booking and discounted fares!");
        });
    }
}

// ========================================================
// 9. ABOUT US PAGE
// ========================================================

function initAboutPage() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        item.addEventListener("toggle", function () {
            if (this.open) {
                faqItems.forEach((other) => {
                    if (other !== this) other.open = false;
                });
            }
        });
    });
}

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
