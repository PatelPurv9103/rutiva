// ========================================================
// Routiva - Full-Stack REST API & Fallback Client Script
// API Base URL: http://localhost:8080/api
// ========================================================

const API_BASE_URL = "http://localhost:8080/api";

// Default Master Rides matching Spring Boot DataInitializer (Cars, Bikes, SUVs, EVs)
const DEFAULT_MASTER_RIDES = [
    {
        id: 1,
        driverId: 1,
        driverName: "Rahul Patel",
        driverPhone: "9876543210",
        fromLocation: "Ahmedabad",
        toLocation: "Gandhinagar",
        travelDate: "2026-11-25",
        departureTime: "08:00 AM",
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        timeSlot: "MORNING",
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
        departureTime: "02:00 PM",
        timeSlot: "AFTERNOON",
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
        departureTime: "06:45 PM",
        timeSlot: "EVENING",
        vehicleName: "Royal Enfield Classic 350",
        vehicleType: "BIKE",
        totalSeats: 1,
        availableSeats: 1,
        pricePerSeat: 50.0,
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
        timeSlot: "MORNING",
        vehicleName: "Toyota Innova Crysta",
        vehicleType: "SUV",
        totalSeats: 6,
        availableSeats: 4,
        pricePerSeat: 220.0,
        status: "AVAILABLE"
    }
];

// Persistent Local Live Rides Store (so booking seats updates dynamically)
function getStoredRides() {
    try {
        const stored = localStorage.getItem("routivaLiveRidesStore");
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {}
    localStorage.setItem("routivaLiveRidesStore", JSON.stringify(DEFAULT_MASTER_RIDES));
    return JSON.parse(JSON.stringify(DEFAULT_MASTER_RIDES));
}

function updateStoredRideSeats(rideId, seatsBookedDelta) {
    const rides = getStoredRides();
    const target = rides.find(r => r.id === parseInt(rideId));
    if (target) {
        target.availableSeats = Math.max(0, target.availableSeats - seatsBookedDelta);
        if (target.availableSeats === 0) {
            target.status = "FULL";
        } else {
            target.status = "AVAILABLE";
        }
        localStorage.setItem("routivaLiveRidesStore", JSON.stringify(rides));
    }
    return rides;
}

// Helper: Get currently logged-in user from localStorage
function getCurrentUser() {
    try {
        const u = JSON.parse(localStorage.getItem("rideLoopCurrentUser"));
        if (u) return u;
    } catch (e) {}
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
                    <div style="display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:#2563eb;color:#ffffff;font-weight:700;font-size:1.1rem;box-shadow:0 2px 5px rgba(0,0,0,0.15);cursor:pointer;" title="${currentUser.fullName} (${currentUser.role}) - Click to Log out">
                        ${initial}
                    </div>
                </div>`;
            avatar.onclick = () => {
                if (confirm(`👤 Logged in as: ${currentUser.fullName}\n📧 ${currentUser.email}\n🏷️ Role: ${currentUser.role || 'PASSENGER'}\n💰 Wallet Balance: ₹${getUserWalletBalance().toFixed(2)}\n\nDo you want to log out?`)) {
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
// 2. LOGIN PAGE (Quick 1-Click Demo Logins & Form)
// ========================================================

function initLoginPage() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Quick Login as Passenger
    const quickPassBtn = document.getElementById("quickLoginPassenger");
    if (quickPassBtn) {
        quickPassBtn.addEventListener("click", function () {
            const passengerUser = {
                id: 4,
                fullName: "Priyanshi Patel",
                email: "priyanshi@gmail.com",
                phone: "9123456780",
                role: "PASSENGER",
                walletBalance: 500.0
            };
            setCurrentUser(passengerUser);
            setUserWalletBalance(500.0);
            alert("✅ Logged in as Passenger: Priyanshi Patel!\n💰 Wallet Balance: ₹500.00");
            window.location.href = "index.html";
        });
    }

    // Quick Login as Driver
    const quickDriverBtn = document.getElementById("quickLoginDriver");
    if (quickDriverBtn) {
        quickDriverBtn.addEventListener("click", function () {
            const driverUser = {
                id: 1,
                fullName: "Rahul Patel",
                email: "rahul.patel@gmail.com",
                phone: "9876543210",
                role: "DRIVER",
                walletBalance: 1200.0
            };
            setCurrentUser(driverUser);
            alert("✅ Logged in as Driver: Rahul Patel!\n🚗 Vehicle: Maruti Swift");
            window.location.href = "my-rides.html";
        });
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value : "";

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
            }
        } catch (error) {
            console.warn("Backend API offline, logging in via demo account:", error);
        }

        // Demo fallback login
        const isDriver = email.includes("driver") || email.includes("rahul");
        const user = {
            id: isDriver ? 1 : 4,
            fullName: isDriver ? "Rahul Patel" : "Priyanshi Patel",
            email: email || (isDriver ? "rahul.patel@gmail.com" : "priyanshi@gmail.com"),
            phone: "9123456780",
            role: isDriver ? "DRIVER" : "PASSENGER",
            walletBalance: isDriver ? 1200.0 : getUserWalletBalance()
        };
        setCurrentUser(user);
        alert(`Welcome back, ${user.fullName} (${user.role})!`);
        window.location.href = isDriver ? "my-rides.html" : "index.html";
    });
}

// ========================================================
// 3. SIGNUP PAGE
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
            }
        } catch (error) {
            console.warn("Backend API unreachable, using local storage:", error);
        }

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
    });
}

// ========================================================
// 4. SEARCH RIDE PAGE (With Time Picker "time select krva wadu")
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

        const departureTimeInput = document.getElementById("departureTime");
        const departureTime = departureTimeInput ? departureTimeInput.value : "08:00";
        const timeSlot = departureTimeInput ? (departureTimeInput.getAttribute("data-slot") || "ALL") : "ALL";

        if (from.toLowerCase() === to.toLowerCase()) {
            alert("Starting point and destination cannot be the same.");
            return;
        }

        const params = new URLSearchParams({
            from: from,
            to: to,
            date: travelDate,
            seats: seats,
            vehicleType: vehicleType,
            time: departureTime,
            timeSlot: timeSlot
        });

        window.location.href = "rides.html?" + params.toString();
    });
}

// ========================================================
// 5. AVAILABLE RIDES PAGE (Category Tabs, Time Filter & Real-Time Seat Status)
// ========================================================

let allFetchedRides = [];
let currentCategoryFilter = "ALL";
let currentTimeFilter = "ALL";

async function initAvailableRidesPage() {
    const ridesPage = document.querySelector(".available-section");
    if (!ridesPage) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const timeParam = params.get("time") || "08:00";
    const timeSlotParam = params.get("timeSlot") || "ALL";
    const seats = parseInt(params.get("seats")) || 1;
    const initialVehicleType = params.get("vehicleType") || "ALL";

    currentCategoryFilter = initialVehicleType;
    currentTimeFilter = timeSlotParam;

    const displayFrom = document.getElementById("displayFrom");
    const displayTo = document.getElementById("displayTo");
    const displayDate = document.getElementById("displayDate");
    const displayTime = document.getElementById("displayTime");

    if (from && displayFrom) displayFrom.textContent = from;
    if (to && displayTo) displayTo.textContent = to;
    if (date && displayDate) {
        displayDate.textContent = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    if (displayTime) {
        displayTime.textContent = timeParam ? formatTimeDisplay(timeParam) : "All Times";
    }

    const ridesContainer = document.getElementById("ridesContainer");
    if (!ridesContainer) return;

    ridesContainer.innerHTML = `<div style="text-align:center;padding:40px;font-size:1.1rem;color:#4b5563;">Searching rides for all vehicle options & times...</div>`;

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
            allFetchedRides = getStoredRidesFiltered(from, to);
        }
    } catch (error) {
        console.warn("Backend API offline, using persistent stored rides:", error);
        allFetchedRides = getStoredRidesFiltered(from, to);
    }

    // Setup Category Tabs & Time Slot Filters
    setupVehicleCategoryTabs(seats);
    setupTimeSlotFilters(seats);
    renderFilteredRides(seats);
}

function formatTimeDisplay(t) {
    if (!t) return "08:00 AM";
    if (t.includes("AM") || t.includes("PM")) return t;
    const parts = t.split(":");
    let h = parseInt(parts[0]);
    const m = parts[1] || "00";
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h < 10 ? '0' + h : h}:${m} ${ampm}`;
}

function getStoredRidesFiltered(from, to) {
    const stored = getStoredRides();
    if (from && to) {
        const matches = stored.filter(r =>
            r.fromLocation.toLowerCase() === from.toLowerCase() &&
            r.toLocation.toLowerCase() === to.toLowerCase()
        );
        return matches.length > 0 ? matches : stored;
    }
    return stored;
}

function setupTimeSlotFilters(seats) {
    const timeButtons = document.querySelectorAll("#timeSlotFilters .route-chip");
    timeButtons.forEach(btn => {
        const slot = btn.getAttribute("data-time");
        btn.onclick = () => {
            timeButtons.forEach(b => {
                b.style.background = "#f1f5f9";
                b.style.color = "#1e293b";
                b.style.borderColor = "#cbd5e1";
            });
            btn.style.background = "#2563eb";
            btn.style.color = "#ffffff";
            btn.style.borderColor = "#2563eb";
            currentTimeFilter = slot;
            renderFilteredRides(seats);
        };
    });
}

function setupVehicleCategoryTabs(seats) {
    const tabs = document.querySelectorAll(".vehicle-tab");

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

    // Filter by Vehicle Category
    if (currentCategoryFilter !== "ALL") {
        filtered = filtered.filter(r => (r.vehicleType || "CAR").toUpperCase() === currentCategoryFilter.toUpperCase());
    }

    // Filter by Time Slot ("time select krva wadu")
    if (currentTimeFilter !== "ALL") {
        filtered = filtered.filter(r => {
            const dep = (r.departureTime || "").toUpperCase();
            if (currentTimeFilter === "MORNING") {
                return dep.includes("AM") || dep.includes("07:") || dep.includes("08:") || dep.includes("09:") || dep.includes("10:") || dep.includes("11:");
            } else if (currentTimeFilter === "AFTERNOON") {
                return dep.includes("12:") || dep.includes("01:") || dep.includes("02:") || dep.includes("03:") || dep.includes("04:") || dep.includes("PM");
            } else if (currentTimeFilter === "EVENING") {
                return dep.includes("05:") || dep.includes("06:") || dep.includes("07:") || dep.includes("08:") || dep.includes("09:");
            }
            return true;
        });
    }

    if (filtered.length === 0) {
        ridesContainer.innerHTML = `
            <div class="empty-rides" style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:12px;">🚘</div>
                <h3>No rides available for this vehicle or time slot</h3>
                <p style="color:#6b7280;margin:10px 0 20px;">Try selecting "All Vehicles" or "All Times".</p>
                <button type="button" class="vehicle-tab active" onclick="document.querySelector('[data-type=\\'ALL\\']').click()">Show All Available Vehicles</button>
            </div>`;
        return;
    }

    // Check if current user booked any of these rides
    const myBookings = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
    const bookedRideIds = myBookings.filter(b => b.bookingStatus === "CONFIRMED").map(b => b.rideId);

    ridesContainer.innerHTML = "";
    filtered.forEach(ride => {
        const vType = (ride.vehicleType || "CAR").toUpperCase();
        let badgeClass = "car";
        let icon = "🚗";
        if (vType === "BIKE") { badgeClass = "bike"; icon = "🏍️"; }
        else if (vType === "SUV") { badgeClass = "suv"; icon = "🚙"; }
        else if (vType === "EV") { badgeClass = "ev"; icon = "⚡"; }

        const isFullyBooked = ride.availableSeats <= 0;
        const isUserBooked = bookedRideIds.includes(ride.id);

        let statusBadge = `<span class="ride-status" style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-weight:600;font-size:0.85rem;display:inline-block;margin-bottom:6px;">Available</span>`;
        if (isFullyBooked) {
            statusBadge = `<span class="ride-status" style="background:#fee2e2;color:#991b1b;padding:4px 12px;border-radius:20px;font-weight:700;font-size:0.85rem;display:inline-block;margin-bottom:6px;">🔴 FULLY BOOKED</span>`;
        }

        let bookButtonHtml = `
            <button class="book-button" onclick="selectAndBookRide(${ride.id}, ${seats})">
                Book This Ride →
            </button>
        `;

        if (isFullyBooked) {
            bookButtonHtml = `
                <button class="book-button" disabled style="background:#94a3b8;cursor:not-allowed;box-shadow:none;">
                    🚫 Seats Full (Sold Out)
                </button>
            `;
        } else if (isUserBooked) {
            bookButtonHtml = `
                <button class="book-button" onclick="window.location.href='my-rides.html'" style="background:#10b981;">
                    ✓ You Booked This (View My Rides)
                </button>
            `;
        }

        const card = document.createElement("div");
        card.className = "ride-card";
        card.innerHTML = `
            <div class="ride-top">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">
                        <h2>${escapeHtml(ride.driverName)}</h2>
                        <span class="vehicle-tag ${badgeClass}">${icon} ${vType}</span>
                        ${isUserBooked ? '<span style="background:#eff6ff;color:#1d4ed8;font-size:0.75rem;padding:2px 8px;border-radius:10px;font-weight:700;">★ Booked by You</span>' : ''}
                    </div>
                    <p>${escapeHtml(ride.vehicleName || "Vehicle")} • Route: <strong>${escapeHtml(ride.fromLocation)} → ${escapeHtml(ride.toLocation)}</strong></p>
                </div>
                <div style="text-align:right;">
                    ${statusBadge}
                    <br>
                    <span class="pay-after-pill">🛡️ Pay After Ride</span>
                </div>
            </div>
            <div class="ride-details">
                <div>
                    <span>Departure Time</span>
                    <h3 style="color:#0f172a;">🕒 ${escapeHtml(ride.departureTime)}</h3>
                </div>
                <div>
                    <span>Available Seats</span>
                    <h3 style="${ride.availableSeats <= 1 ? 'color:#b91c1c;font-weight:800;' : ''}">
                        ${ride.availableSeats > 0 ? `${ride.availableSeats} ${vType === 'BIKE' ? 'Pillion Seat' : 'Seats'}` : '0 Seats (Full)'}
                    </h3>
                </div>
                <div>
                    <span>Price / Seat</span>
                    <h3 style="color:#2563eb;">₹${ride.pricePerSeat}</h3>
                </div>
            </div>
            ${bookButtonHtml}
        `;
        ridesContainer.appendChild(card);
    });
}

function selectAndBookRide(rideId, seats) {
    window.location.href = `booking.html?rideId=${rideId}&seats=${seats || 1}`;
}

// ========================================================
// 6. BOOKING PAGE (Exact Date, Month, Year Commute Day Pills & Dynamic Seat Reduction)
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
    const startDateInput = document.getElementById("commuteStartDate");

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

    // Set commute start date to ride's date or Nov 23, 2026
    if (startDateInput) {
        startDateInput.value = "2026-11-23";
    }

    // Fetch ride details
    const storedRides = getStoredRides();
    bookingRideData = storedRides.find(r => r.id === parseInt(rideId)) || DEFAULT_MASTER_RIDES[0];

    try {
        const response = await fetch(`${API_BASE_URL}/rides/${rideId}`);
        const result = await response.json();
        if (result && result.data) {
            bookingRideData = result.data;
        }
    } catch (err) {}

    // Render Ride Details Box
    renderSelectedRideBox(bookingRideData);

    // Setup Commute Days with Exact Date, Month, and Year
    setupFullDateCommutePills(bookingRideData);

    // Handle Form Submit
    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const seats = parseInt(seatsSelect ? seatsSelect.value : "1");

        // Selected Commute Days with full formatted Date, Month, Year
        const checkedDayEls = document.querySelectorAll("input[name='commuteDay']:checked");
        const selectedFullDates = Array.from(checkedDayEls).map(el => el.getAttribute("data-full-date") || el.value);

        if (selectedFullDates.length === 0) {
            alert("Please select at least 1 commute date for your ride.");
            return;
        }
        const fullDatesFormatted = selectedFullDates.join(", ");

        // Selected Payment Method
        const paymentRadio = document.querySelector("input[name='paymentMethod']:checked");
        const paymentMethod = paymentRadio ? paymentRadio.value : "WALLET_AFTER_RIDE";

        // Calculate final fare
        const daysCount = selectedFullDates.length;
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
            selectedDays: fullDatesFormatted
        };

        const submitBtn = bookingForm.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Confirming Reservation...";
        }

        // 1. Immediately update stored ride seats so it reflects right away on rides.html!
        updateStoredRideSeats(rideId, seats);

        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                // Also store demo booking for instant client view
                saveBookingLocally(result.data.id, bookingRideData, currentUser, seats, fullDatesFormatted, paymentMethod, finalFare);
                alert(`🎉 Booking Confirmed!\n\nBooking ID: #${result.data.id}\nDriver: ${result.data.driverName}\nVehicle: ${bookingRideData.vehicleName} (${bookingRideData.vehicleType})\nRoute: ${result.data.fromLocation} → ${result.data.toLocation}\n\n📅 Commute Dates:\n${fullDatesFormatted}\n\nTotal Fare: ₹${finalFare}\n🛡️ Pay After Ride: ₹0 deducted now. Deducted only after trip is completed!`);
                window.location.href = "my-rides.html";
                return;
            }
        } catch (error) {
            console.warn("Backend API offline, saving to demo storage:", error);
        }

        const newBookingId = Date.now();
        saveBookingLocally(newBookingId, bookingRideData, currentUser, seats, fullDatesFormatted, paymentMethod, finalFare);

        alert(`🎉 Booking Confirmed!\n\nBooking ID: #${newBookingId}\nDriver: ${bookingRideData.driverName}\nVehicle: ${bookingRideData.vehicleName} (${bookingRideData.vehicleType})\nRoute: ${bookingRideData.fromLocation} → ${bookingRideData.toLocation}\n\n📅 Commute Schedule (Date, Month, Year):\n${fullDatesFormatted}\n\nTotal Fare: ₹${finalFare}\n🛡️ Pay After Ride Protected: ₹0 deducted now. Deducted after trip is completed!`);
        window.location.href = "my-rides.html";
    });
}

function saveBookingLocally(id, ride, user, seats, fullDatesStr, paymentMethod, totalFare) {
    const demoBooking = {
        id: id,
        rideId: ride.id,
        passengerId: user ? user.id : 4,
        driverName: ride.driverName,
        fromLocation: ride.fromLocation,
        toLocation: ride.toLocation,
        travelDate: ride.travelDate,
        departureTime: ride.departureTime,
        vehicleName: ride.vehicleName,
        vehicleType: ride.vehicleType || "CAR",
        seatsBooked: seats,
        selectedDays: fullDatesStr,
        paymentMethod: paymentMethod,
        paymentStatus: "PENDING_COMPLETION",
        totalFare: totalFare,
        bookingStatus: "CONFIRMED",
        bookingDate: new Date().toISOString()
    };
    const stored = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
    stored.unshift(demoBooking);
    localStorage.setItem("rideLoopBookings", JSON.stringify(stored));
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
            <strong>🕒 ${escapeHtml(ride.departureTime)}</strong>
        </div>
        <div class="ride-info-row">
            <span>Available Seats Left</span>
            <strong style="color:#16a34a;">${ride.availableSeats} Seat(s)</strong>
        </div>
        <div class="ride-info-row">
            <span>Rate Per Seat</span>
            <strong style="color:#2563eb;">₹${ride.pricePerSeat}</strong>
        </div>
    `;
}

// 6b. Setup Commute Day Checkboxes Showing Full Date, Month, and Year ("je daily ride ma days select thay ema date ane month and year dekhye")
function setupFullDateCommutePills(ride) {
    const container = document.getElementById("commuteDaysPills");
    const startDateInput = document.getElementById("commuteStartDate");
    const seatsSelect = document.getElementById("bookingSeats");
    const btnAll = document.getElementById("btnAllWeekdays");
    const btnSingle = document.getElementById("btnSingleDay");

    if (!container) return;

    function renderDayPills() {
        const baseDateVal = startDateInput ? startDateInput.value : "2026-11-23";
        const baseDate = new Date(baseDateVal + "T00:00:00");

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        container.innerHTML = "";

        days.forEach((dayName, idx) => {
            const d = new Date(baseDate);
            d.setDate(baseDate.getDate() + idx);

            const dayNum = d.getDate();
            const monthName = d.toLocaleDateString("en-IN", { month: "short" });
            const yearNum = d.getFullYear();
            const fullDateString = `${dayNum} ${monthName} ${yearNum} (${dayName})`;

            const label = document.createElement("label");
            label.className = "day-pill-label";
            label.style.cssText = "display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;cursor:pointer;font-size:0.85rem;margin-bottom:6px;";

            // Default check Mon-Fri
            const isChecked = idx < 5;

            label.innerHTML = `
                <input type="checkbox" name="commuteDay" value="${dayName}" data-full-date="${fullDateString}" ${isChecked ? 'checked' : ''} style="accent-color:#2563eb;cursor:pointer;">
                <span><strong>${dayName}</strong> <span style="color:#475569;font-size:0.8rem;background:#f1f5f9;padding:2px 6px;border-radius:4px;margin-left:2px;">${dayNum} ${monthName} ${yearNum}</span></span>
            `;

            container.appendChild(label);
        });

        attachCheckboxListeners();
        updateFareCalculations();
    }

    function attachCheckboxListeners() {
        const checkboxes = container.querySelectorAll("input[name='commuteDay']");
        checkboxes.forEach(cb => {
            cb.addEventListener("change", updateFareCalculations);
        });
    }

    function updateFareCalculations() {
        if (!ride) return;
        const seats = parseInt(seatsSelect ? seatsSelect.value : "1") || 1;
        const checkedBoxes = Array.from(container.querySelectorAll("input[name='commuteDay']:checked"));
        const daysCount = Math.max(1, checkedBoxes.length);

        const fullDatesList = checkedBoxes.map(cb => cb.getAttribute("data-full-date"));

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

        if (daysEl) {
            if (fullDatesList.length > 0) {
                daysEl.innerHTML = `<span style="color:#2563eb;font-weight:700;">${daysCount} Days Commute:</span><br>${fullDatesList.join('<br>')}`;
            } else {
                daysEl.textContent = "1 Day";
            }
        }

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

    if (startDateInput) {
        startDateInput.addEventListener("change", renderDayPills);
    }

    if (seatsSelect) {
        seatsSelect.addEventListener("change", updateFareCalculations);
    }

    if (btnAll) {
        btnAll.addEventListener("click", () => {
            const cbs = container.querySelectorAll("input[name='commuteDay']");
            cbs.forEach((cb, idx) => {
                cb.checked = (idx < 5);
            });
            updateFareCalculations();
        });
    }

    if (btnSingle) {
        btnSingle.addEventListener("click", () => {
            const cbs = container.querySelectorAll("input[name='commuteDay']");
            cbs.forEach((cb, idx) => {
                cb.checked = (idx === 0);
            });
            updateFareCalculations();
        });
    }

    renderDayPills();
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

    const walletBannerAmount = document.getElementById("userWalletBalance");
    if (walletBannerAmount) {
        walletBannerAmount.textContent = `₹${currentWallet.toFixed(2)}`;
    }

    const csvExportBtn = document.getElementById("csvExportBtn");
    if (csvExportBtn && currentUser) {
        csvExportBtn.href = `${API_BASE_URL}/bookings/export/csv?passengerId=${currentUser.id}`;
    }

    const tabUpcoming = document.getElementById("tabUpcoming");
    const tabCompleted = document.getElementById("tabCompleted");
    const tabCancelled = document.getElementById("tabCancelled");

    if (tabUpcoming && tabCompleted && tabCancelled) {
        tabUpcoming.onclick = () => switchMyRidesTab("UPCOMING");
        tabCompleted.onclick = () => switchMyRidesTab("COMPLETED");
        tabCancelled.onclick = () => switchMyRidesTab("CANCELLED");
    }

    setupOfferRideModal();
    await loadMyBookings();
}

async function loadMyBookings() {
    const currentUser = getCurrentUser();
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/my?passengerId=${currentUser.id}`);
        const result = await response.json();
        if (result && result.data && result.data.length > 0) {
            myRidesData = result.data;
        } else {
            myRidesData = getLocalDemoBookings();
        }
    } catch (err) {
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
            rideId: 1,
            driverName: "Rahul Patel",
            vehicleName: "Maruti Swift",
            vehicleType: "CAR",
            fromLocation: "Ahmedabad",
            toLocation: "Gandhinagar",
            travelDate: "2026-11-25",
            departureTime: "08:00 AM",
            seatsBooked: 1,
            selectedDays: "23 Nov 2026 (Mon), 24 Nov 2026 (Tue), 25 Nov 2026 (Wed), 26 Nov 2026 (Thu), 27 Nov 2026 (Fri)",
            paymentMethod: "WALLET_AFTER_RIDE",
            paymentStatus: "PENDING_COMPLETION",
            totalFare: 450.0,
            bookingStatus: "CONFIRMED"
        },
        {
            id: 102,
            rideId: 3,
            driverName: "Vikram Singh",
            vehicleName: "Royal Enfield Classic 350",
            vehicleType: "BIKE",
            fromLocation: "Ahmedabad",
            toLocation: "Gandhinagar",
            travelDate: "2026-11-25",
            departureTime: "08:15 AM",
            seatsBooked: 1,
            selectedDays: "25 Nov 2026 (Wed)",
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
                    <button class="btn-delete-ride" onclick="deleteMyBooking(${b.id}, ${b.rideId || 1}, ${b.seatsBooked || 1})">
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
                    <button class="btn-delete-ride" onclick="deleteMyBooking(${b.id}, ${b.rideId || 1}, ${b.seatsBooked || 1})" style="background:#64748b;">
                        🗑️ Delete Record
                    </button>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="ride-top">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">
                        <h2>${escapeHtml(b.driverName || "Driver")}</h2>
                        <span class="vehicle-tag ${badgeClass}">${icon} ${vType}</span>
                        <span style="font-size:0.8rem;color:#64748b;font-weight:600;">Booking #${b.id}</span>
                    </div>
                    <p>${escapeHtml(b.vehicleName || "Vehicle")} • <strong>${escapeHtml(b.fromLocation)} → ${escapeHtml(b.toLocation)}</strong></p>
                    <div style="margin-top:8px;">
                        <span style="font-size:0.85rem;color:#1e3a8a;background:#eff6ff;padding:4px 10px;border-radius:6px;display:inline-block;border:1px solid #bfdbfe;">
                            📅 <strong>Dates (Day, Month, Year):</strong> ${escapeHtml(b.selectedDays || b.travelDate || "Single Trip")}
                        </span>
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
                <div><span>Travel Date</span><h3>${b.travelDate || 'Today'}</h3></div>
                <div><span>Departure Time</span><h3>🕒 ${b.departureTime || '08:00 AM'}</h3></div>
                <div><span>Seats Booked</span><h3>${b.seatsBooked} Seat(s)</h3></div>
                <div><span>Total Fare</span><h3 style="color:#2563eb;">₹${b.totalFare}</h3></div>
            </div>
            ${actionButtons}
        `;
        container.appendChild(card);
    });
}

// 7a. Complete Ride & Deduct Wallet
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
    } catch (err) {}

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

// 7b. Delete / Cancel Ride (Restores vehicle seats immediately! "ride delete nu option")
async function deleteMyBooking(bookingId, rideId, seatsBooked) {
    if (!confirm(`🗑️ Are you sure you want to Cancel & Delete Booking #${bookingId}?\n\nYour reserved seat(s) will be restored to the vehicle.`)) {
        return;
    }

    // Restore vehicle seats in local store so rides.html updates right away!
    if (rideId && seatsBooked) {
        updateStoredRideSeats(rideId, -seatsBooked); // negative delta adds back seats
    }

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (response.ok && result.success) {
            alert(`🗑️ Booking #${bookingId} has been successfully deleted. Seats have been restored.`);
            await loadMyBookings();
            return;
        }
    } catch (err) {}

    const stored = JSON.parse(localStorage.getItem("rideLoopBookings")) || [];
    const updated = stored.filter(b => b.id !== bookingId);
    localStorage.setItem("rideLoopBookings", JSON.stringify(updated));
    myRidesData = updated;

    alert(`🗑️ Booking #${bookingId} has been deleted. Seats restored to vehicle.`);
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

        const newRideObj = {
            id: Date.now(),
            driverId: currentUser ? currentUser.id : 1,
            driverName: currentUser ? currentUser.fullName : "Rahul Patel",
            driverPhone: "9876543210",
            fromLocation: from,
            toLocation: to,
            travelDate: date,
            departureTime: time,
            timeSlot: "MORNING",
            vehicleName: vehicleName,
            vehicleType: vehicleType,
            totalSeats: seats,
            availableSeats: seats,
            pricePerSeat: price,
            status: "AVAILABLE"
        };

        const currentStored = getStoredRides();
        currentStored.unshift(newRideObj);
        localStorage.setItem("routivaLiveRidesStore", JSON.stringify(currentStored));

        try {
            await fetch(`${API_BASE_URL}/rides`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {}

        alert(`🚀 Ride Published Successfully!\n\nRoute: ${from} → ${to}\nVehicle: ${vehicleType} (${vehicleName})\nSeats: ${seats}\nPrice: ₹${price}/seat`);
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
                await fetch(`${API_BASE_URL}/subscriptions/select`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser ? currentUser.id : 4, planName: "FREE PLAN" })
                });
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
