document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/bookings')
        .then(response => response.json())
        .then(bookings => {
            const tbody = document.getElementById('userTableBody');
            bookings.forEach((booking, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.mobile}</td> <!-- Change phone to mobile -->
                    <td>${new Date(booking.fromDate).toDateString()}</td> <!-- Change from to fromDate -->
                    <td>${new Date(booking.toDate).toDateString()}</td> <!-- Change to toDate -->
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching booking data:', error));
});
