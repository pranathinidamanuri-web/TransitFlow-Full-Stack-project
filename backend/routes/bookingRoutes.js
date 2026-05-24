const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  db.all(
    `SELECT * FROM tickets WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

module.exports = router;