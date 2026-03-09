// ================================
// LOGIN FUNCTION
// ================================

function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";

    } else {
        alert("Invalid username or password");
    }
}


// ================================
// LOGOUT FUNCTION
// ================================

function logoutUser() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}


// ================================
// CHECK LOGIN STATUS
// ================================

function checkLogin() {

    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "login.html";
    }

}


// ================================
// EVENT FEES
// ================================

const eventFees = {
    "AI & Robotics Seminar": 200,
    "Research Paper Presentation": 150,
    "Campus Music Festival": 100,
    "Arts Exhibition": 120
};


// ================================
// REGISTER EVENT BUTTON
// ================================

function registerEvent(eventName) {

    localStorage.setItem("selectedEvent", eventName);

    window.location.href = "register.html";

}

window.registerEvent = registerEvent;


// ================================
// PAGE LOAD FUNCTIONS
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // ================= NAVBAR ACTIVE LINK =================

    const links = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    // ================= REGISTER PAGE LOGIC =================

    const selectedEvent = localStorage.getItem("selectedEvent");

    const eventInput = document.getElementById("eventName");
    const feesInput = document.getElementById("fees");
    const form = document.getElementById("registerForm");


    if (eventInput && selectedEvent) {

        eventInput.value = selectedEvent;

        feesInput.value = eventFees[selectedEvent] || 0;

    }


    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const roll = document.getElementById("roll").value.trim();
            const branch = document.getElementById("branch").value.trim();
            const event = eventInput.value;
            const fees = feesInput.value;


            if (!name || !email || !roll || !branch) {
                alert("Please fill all fields.");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
                return;
            }

            if (roll.length < 5) {
                alert("Invalid Roll Number.");
                return;
            }


            let registrations = JSON.parse(localStorage.getItem("registrations")) || [];


            const alreadyRegistered = registrations.some(reg => reg.roll === roll && reg.event === event);

            if (alreadyRegistered) {
                alert("You already registered for this event!");
                return;
            }


            registrations.push({ name, email, roll, branch, event, fees });

            localStorage.setItem("registrations", JSON.stringify(registrations));


            alert("Registration Successful ✅");


            form.reset();

            eventInput.value = selectedEvent;
            feesInput.value = eventFees[selectedEvent] || 0;


            displayRegisteredEvents();
            displayUpcomingEvents();

        });

    }


    displayRegisteredEvents();
    displayUpcomingEvents();

});


// ================================
// DISPLAY REGISTERED EVENTS
// ================================

function displayRegisteredEvents() {

    const list = document.getElementById("registrationList");

    if (!list) return;

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    list.innerHTML = "";

    if (registrations.length === 0) {

        list.innerHTML = "<p style='text-align:center;'>No registrations yet.</p>";

        return;

    }


    registrations.forEach(function (reg) {

        list.innerHTML += `
        <div class="registered-card">
            <h4>${reg.event}</h4>
            <p><strong>Name:</strong> ${reg.name}</p>
            <p><strong>Roll No:</strong> ${reg.roll}</p>
            <p><strong>Branch:</strong> ${reg.branch}</p>
            <p><strong>Fees Paid:</strong> ₹${reg.fees}</p>
        </div>`;

    });

}


// ================================
// DISPLAY UPCOMING EVENTS
// ================================

function displayUpcomingEvents() {

    const upcomingBox = document.getElementById("upcomingList");

    if (!upcomingBox) return;

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    upcomingBox.innerHTML = "";

    if (registrations.length === 0) {

        upcomingBox.innerHTML = "<p style='text-align:center;'>No registered events yet.</p>";

        return;

    }


    registrations.forEach(function (reg) {

        upcomingBox.innerHTML += `
        <div class="registered-card">
            <h4>${reg.event}</h4>
            <p><strong>Name:</strong> ${reg.name}</p>
            <p><strong>Roll No:</strong> ${reg.roll}</p>
            <p><strong>Branch:</strong> ${reg.branch}</p>
            <p><strong>Fees Paid:</strong> ₹${reg.fees}</p>
        </div>`;

    });

}