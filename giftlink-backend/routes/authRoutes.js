//Step 1 - Task 2: Import necessary packages
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
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
    try {
        const { firstName, lastName, email, password } = req.body;
        logger.info('Registration attemp initiated');

        // 1. Check data passed through inputs
        if (!email || !password) {
            logger.warn({email}, 'Registration failed: Missing credentials.');
            return res.status(400).json({error: 'Email and password are required.'});
        }

        // 2. Connect to database
        const db = await connectToDatabase();
        // Call gifts collection
        const collection = db.collection('users');

        // 3. Does the user already exist?
        const existingUser = await collection.findOne({ email: email }); 
        if (existingUser) {
            logger.info({ email }, 'Registration blocked: User already exists.');
            return res.status(409).json({ error: 'Email is already registered.' });
        }

        // 4. Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create the new user
        const newUser = await collection.insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            createdAt: newDate(),
        });

        await newUser.save();

        // 6. Generate JWT
        const token = jwt.sign(
            { id: newUser.insertedId},
            JWT_SECRET || 'fallback_secret_for_dev',
            { expiresIn: '2h' }
        );

    } catch(error) {

    }

});

module.exports = router;
