const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/book', (req, res) => {
  const { user_id, schedule_id, seat_number } = req.body;

  // Step 1: Check schedule exists
  db.get(`SELECT * FROM schedules WHERE id = ?`, [schedule_id], (err, schedule) => {
    if (err) return res.status(500).send(err.message);

    if (!schedule) {
      return res.status(400).json({ message: "Schedule not found" });
    }

    // Step 2: Check departure time
    const currentTime = new Date();
    const departureTime = new Date(schedule.departure_time);

    if (departureTime < currentTime) {
      return res.status(400).json({ message: "Cannot book after departure" });
    }

    // Step 3: Check seat availability
    db.get(
      `SELECT * FROM tickets WHERE schedule_id = ? AND seat_number = ? AND status != 'cancelled'`,
      [schedule_id, seat_number],
      (err, existingTicket) => {
        if (err) return res.status(500).send(err.message);

        if (existingTicket) {
          return res.status(400).json({ message: "Seat already booked" });
        }

        // Step 4: Insert ticket
        db.run(
          `INSERT INTO tickets (user_id, schedule_id, seat_number, status)
           VALUES (?, ?, ?, 'booked')`,
          [user_id, schedule_id, seat_number],
          function (err) {
            if (err) return res.status(500).send(err.message);

            res.json({
              message: "Ticket booked successfully",
              ticket_id: this.lastID
            });
          }
        );
      }
    );
  });
});


router.put('/:id/cancel', (req, res) => {
  const ticketId = req.params.id;

  // Step 1: check ticket exists
  db.get(`SELECT * FROM tickets WHERE id = ?`, [ticketId], (err, ticket) => {
    if (err) return res.status(500).send(err.message);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Step 2: check already cancelled
    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: "Ticket already cancelled" });
    }

    // Step 3: update status
    db.run(
      `UPDATE tickets SET status = 'cancelled' WHERE id = ?`,
      [ticketId],
      function (err) {
        if (err) return res.status(500).send(err.message);

        res.json({ message: "Ticket cancelled successfully" });
      }
    );
  });
});

module.exports = router;