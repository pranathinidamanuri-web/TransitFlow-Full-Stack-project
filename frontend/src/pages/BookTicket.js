import { useState } from 'react';
import API from '../services/api';

function BookTicket() {
  const [userId, setUserId] = useState('');
  const [scheduleId, setScheduleId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  const handleBooking = () => {
    API.post('/tickets/book', {
      user_id: userId,
      schedule_id: scheduleId,
      seat_number: seatNumber
    })
      .then(res => alert(res.data.message))
      .catch(err => alert(err.response?.data?.message || "Error"));
  };

  return (
    <div>
      <h2>Book Ticket</h2>

      <input
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />

      <input
        placeholder="Schedule ID"
        onChange={(e) => setScheduleId(e.target.value)}
      />

      <input
        placeholder="Seat Number"
        onChange={(e) => setSeatNumber(e.target.value)}
      />

      <button onClick={handleBooking}>Book</button>
    </div>
  );
}

export default BookTicket;