const express = require('express');
const cors = require('cors');

const ticketRoutes = require('./routes/ticketRoutes');
const routeRoutes = require('./routes/routeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('TransitFlow Backend Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});