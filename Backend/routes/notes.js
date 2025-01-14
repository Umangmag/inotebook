const express = require('express');
const router = express.Router();

// Define route handlers inside the router
router.get('/', (req, res) => {
  res.send('Logging in...');
});


module.exports = router;  // Export the router
