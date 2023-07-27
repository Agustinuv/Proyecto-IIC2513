const express = require('express');
const router = express.Router();

const bookTableController = require('../../../controllers/booked_table.controller');

// Create a new table
router.post('/new-booking', bookTableController.newBooking);

// Get all available tables of a seller
router.get('/get-tables/:seller_id/:tableSize/:date', bookTableController.getAvailableTables);

// Get booked tables of a user
router.get('/get-my-bookings/:user_id', bookTableController.getMyBookings);


module.exports = router;