document.addEventListener("DOMContentLoaded", function () {
  const fromDateInput = document.getElementById("fromDate");
  const currentDate = new Date().toISOString().split("T")[0];
  fromDateInput.value = currentDate;
});

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const errorMessage = document.getElementById("error-message");

    if (new Date(fromDate) > new Date(toDate)) {
      errorMessage.textContent =
        'The "To" date cannot be earlier than the "From" date.';
      errorMessage.style.display = "block";
      return;
    } else {
      errorMessage.style.display = "none";
    }

    const bookingDetails = { name, email, mobile, fromDate, toDate };
    console.log("Booking details:", bookingDetails); // Debug statement

    fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
