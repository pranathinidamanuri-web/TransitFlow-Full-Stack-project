const db = require('./db/database'); 
db.serialize(() => {

  // USERS
  db.run(`
    INSERT INTO users (name, email, password, role)
    VALUES 
    ('John Doe', 'john@test.com', '1234', 'passenger'),
    ('Admin User', 'admin@test.com', 'admin123', 'admin')
  `);

  // BUSES
  db.run(`
    INSERT INTO buses (bus_number, capacity)
    VALUES
    ('TS01AB1234', 40),
    ('TS02CD5678', 50)
  `);

  // SCHEDULES (FIXED TIME FORMAT)
  db.run(`
    INSERT INTO schedules (bus_id, route_from, route_to, departure_time, arrival_time)
    VALUES
    (1, 'Hyderabad', 'Bangalore', '2026-06-01T08:00:00', '2026-06-01T20:00:00'),
    (2, 'Vijayawada', 'Hyderabad', '2026-06-02T09:00:00', '2026-06-02T18:00:00')
  `);

  console.log("Seed data inserted correctly");
});

db.close();