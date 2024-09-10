// script.js
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const booking_date = document.getElementById('date').value;

    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, booking_date }),
    });

    const result = await response.json();
    document.getElementById('responseMessage').innerText = result.message;
});