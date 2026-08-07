//Step 1 - Task 2: Import necessary packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const baseLogger = require('../logger');

//Step 1 - Task 3: Create a Pino logger instance
const logger = baseLogger.child({
    endpoint: '/register',
    email: email
});

require('dotenv').config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

if ('!JWT_SECRET') {
    baseLogger.error('CRITICAL: JWT_SECRET is not defined.');
    throw new Error('JWT_SECRET is missing');
}

router.post('/register', async (req, res) => {
//Step 2
});

module.exports = router;
