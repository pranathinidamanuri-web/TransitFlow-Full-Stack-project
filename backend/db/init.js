const db = require('./database');

db.serialize(() => {

  // USERS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'passenger')) NOT NULL
    )
  `);

  // BUSES TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS buses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bus_number TEXT NOT NULL,
      capacity INTEGER NOT NULL
    )
  `);

  // BOOKINGS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      bus_id INTEGER,
      seats INTEGER,
      booking_date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(bus_id) REFERENCES buses(id)
    )
  `);  

  db.run(`
   CREATE TABLE tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  schedule_id INTEGER,
  seat_number INTEGER,
  status TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(schedule_id) REFERENCES schedules(id),
  UNIQUE(schedule_id, seat_number)
);
    `);

  db.run(`CREATE TABLE IF NOT EXISTS 
    schedules(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id INTEGER,
    route_from TEXT,
    route_to TEXT,
    departure_time TEXT,
    arrival_time TEXT
    )`);

  console.log("All tables created successfully");
});

db.close();