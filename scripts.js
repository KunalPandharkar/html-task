let employeeData = JSON.parse(localStorage.getItem("EmployeeInfo")) || {};
let BookingsList = JSON.parse(localStorage.getItem("BookingsList")) || [];
let Notifications = JSON.parse(localStorage.getItem("Notifications")) || [];


document.getElementById("profileUpdate").addEventListener("submit", function (event) {


    const name = document.getElementById("pname").value;
    const pempid = document.getElementById("pempid").value;
    const pdesignation = document.getElementById("pdesignation").value;
    const pdept = document.getElementById("pdept").value;

    const Profile = {
        name: name,
        pempid: pempid,
        pdesignation: pdesignation,
        pdept: pdept,
    };

    localStorage.setItem("EmployeeInfo", JSON.stringify(Profile));

    employeeData = JSON.parse(localStorage.getItem("EmployeeInfo")) || {};

    alert("Profile Updated Successfully !");

    loadInfo();


});



document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const empid = document.getElementById("empid").value;
    const startdt = document.getElementById("startDate").value;
    const enddt = document.getElementById("endDate").value;
    const floor = document.getElementById("floor").value;

    // Generate a random number between 5000 and 6000 (inclusive)
    const min = 5000;
    const max = 6000;
    const seat_no = Math.floor(Math.random() * (max - min + 1)) + min;


    const Bookings = {
        startdt: startdt,
        enddt: enddt,
        seat_no: seat_no,
        floor: floor,
    };

    const Profile = {
        name: name,
        pempid: empid,
        pdesignation: "",
        pdept: "",
    };

    localStorage.setItem("EmployeeInfo", JSON.stringify(Profile));

    employeeData = JSON.parse(localStorage.getItem("EmployeeInfo")) || {};

    BookingsList.push(Bookings);

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    localStorage.setItem("BookingsList", JSON.stringify(BookingsList));


    BookingsList = JSON.parse(localStorage.getItem("BookingsList")) || [];

    alert("Booked Successfully !");

    loadInfo();
});


document.getElementById("notification").addEventListener("submit", function (event) {


    console.log("here")
    const message_type = document.getElementById("message_type").value;
    const message = document.getElementById("message").value;

    const Notification = {
        message_type: message_type,
        message: message,
    };

    Notifications.push(Notification);

    localStorage.setItem("Notifications", JSON.stringify(Notifications));

    alert("Notificaition sent Successfully !")


    Notifications = JSON.parse(localStorage.getItem("Notifications")) || [];

    loadInfo();
});



function loadInfo() {
    const PastBookings = document.getElementById("past-bookings");
    const notification_div = document.getElementById("messages_notification");
    const news_notification = document.getElementById("news_notification");
    const ProfilePastBookings = document.getElementById("profile-past-bookings");
    const todays_reservation = document.getElementById("todays_reservation");
    const initials = document.getElementById("initials");
    PastBookings.innerHTML = "";
    ProfilePastBookings.innerHTML = "";
    notification_div.innerHTML = "";
    news_notification.innerHTML = "";
    todays_reservation.innerHTML = "";
    initials.innerHTML = `${employeeData.name[0]}${employeeData.name[1].toUpperCase()}`

    document.getElementById("pname").value = `${employeeData.name}`;
    document.getElementById("name").value = `${employeeData.name}`;
    document.getElementById("pdept").value = `${employeeData.pdept}`;
    document.getElementById("pdesignation").value = `${employeeData.pdesignation}`;
    document.getElementById("pempid").value = `${employeeData.pempid}`;
    document.getElementById("empid").value = `${employeeData.pempid}`;
    $counter = 0;

    todays_reservation.innerHTML = `<p><span style="font-weight: bold;">Location:</span> ${BookingsList[BookingsList.length - 1].floor}</p>
    <p><span style="font-weight: bold;">Workspace:</span> Single Desk</p>
    <p><span style="font-weight: bold;">Seat Number:</span> ${BookingsList[BookingsList.length - 1].seat_no}</p>
    <p><span style="font-weight: bold;">Date:</span> ${BookingsList[BookingsList.length - 1].startdt} - ${BookingsList[BookingsList.length - 1].enddt}</p>`;



    for (let i = BookingsList.length - 1; i >= 0; i--) {
        const Booking = BookingsList[i];
        const listItem = document.createElement("tr");
        listItem.innerHTML = `<td>${Booking.floor}</td><td>${Booking.seat_no}</td><td>${Booking.startdt} -  ${Booking.enddt}</td>`;
        i == BookingsList.length - 1 ? listItem.style = 'background-color:#007bff' : null;
        if ($counter == 5) break;
        $counter += 1;
        PastBookings.appendChild(listItem);
    }


    for (let i = BookingsList.length - 1; i >= 0; i--) {
        const Booking = BookingsList[i];
        const listItem = document.createElement("tr");
        listItem.innerHTML = `<td>${Booking.floor}</td><td>${Booking.seat_no}</td><td>${Booking.startdt} -  ${Booking.enddt}</td>`;
        i == BookingsList.length - 1 ? listItem.style = 'background-color:#007bff;color:white' : null;
        ProfilePastBookings.appendChild(listItem);
    }

    for (let i = Notifications.length - 1; i >= 0; i--) {
        const Message = Notifications[i];
        if (Message.message_type == "News") continue;
        const listItem = document.createElement("div");
        listItem.innerHTML = `<div class="alert alert-secondary" role="alert">
         ${Message.message}
    </div>`;
        notification_div.appendChild(listItem);
    }

    for (let i = Notifications.length - 1; i >= 0; i--) {
        const Message = Notifications[i];
        if (Message.message_type == "Announcement") continue;
        const listItem = document.createElement("div");
        listItem.innerHTML = `<div class="alert alert-secondary" role="alert">
         ${Message.message}
    </div>`;
        news_notification.appendChild(listItem);
    }
}

// Initial display of employee list on page load
loadInfo();

function toggleProfileSidebar() {
    const sidebar = document.getElementById("profileSidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar.style.width === "700px") {
        sidebar.style.width = "0";
        overlay.style.display = "none";
    } else {
        sidebar.style.width = "700px";
        overlay.style.display = "block";
    }
}



// Function to close the sidebar and overlay
function closeOverlay() {
    const sidebar = document.getElementById("profileSidebar");
    const overlay = document.getElementById("overlay");

    sidebar.style.width = "0";
    overlay.style.display = "none";
}


const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const submitBtn = document.getElementById("submitBtn");

// Show the modal when clicking the "Open Modal" button
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close the modal when clicking the close button or outside the modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Prevent modal from closing when clicking inside the modal content
modal.children[0].addEventListener("click", (event) => {
    event.stopPropagation();
});