import { useEffect, useState } from 'react';
import API from '../services/api';

function BookingHistory() {
  const [tickets, setTickets] = useState([]);

  const userId = 1; // demo

  const fetchBookings = () => {
    API.get(`/bookings/${userId}`)
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelTicket = (id) => {
    API.put(`/tickets/${id}/cancel`)
      .then(() => {
        alert("Cancelled");
        fetchBookings();
      })
      .catch(err => alert(err.response?.data?.message));
  };

  return (
    <div>
      <h2>My Bookings</h2>

      {tickets.length === 0 && <p>No bookings</p>}

      {tickets.map(ticket => (
        <div key={ticket.id}>
          <p>Seat: {ticket.seat_number}</p>
          <p>Status: {ticket.status}</p>

          {ticket.status !== 'cancelled' && (
            <button onClick={() => cancelTicket(ticket.id)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;