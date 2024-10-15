// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controller/userController'); // Import the controller

// Define user routes
// router.post('/users', createUser); // Route to create a new user
router.get('/users', getUsers); // Route to get the list of users

module.exports = router; // Export the router