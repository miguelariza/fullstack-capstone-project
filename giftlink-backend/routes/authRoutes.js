//Step 1 - Task 2: Import necessary packages
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const dotenv = require('dotenv');

dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    logger.error('CRITICAL: JWT_SECRET is not defined.');
    throw new Error('JWT_SECRET is missing');
}

router.post('/register', async (req, res) => {
//Step 2
    try {
        const { firstName, lastName, email, password } = req.body;
        
        //Step 1 - Task 3: Create a Pino logger instance
        logger.child({
            endpoint: '/register',
            email: email
        });
        
        logger.info('Registration attemp initiated');

        // 1. Check data passed through inputs
        if (!email || !password || !email || !password) {
            logger.warn({email}, 'Registration failed: Missing credentials.');
            return res.status(400).json({error: 'Email and password are required.'});
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 2. Connect to database
        const db = await connectToDatabase();
        // Call gifts collection
        const collection = db.collection('users');

        // 3. Does the user already exist?
        const existingUser = await collection.findOne({ email: normalizedEmail }); 
        if (existingUser) {
            logger.info({ normalizedEmail }, 'Registration blocked: User already exists.');
            return res.status(409).json({ error: 'Email is already registered.' });
        }

        // 4. Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create the new user
        const newUser = await collection.insertOne({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
            createdAt: new Date(),
        });

        // 6. Generate JWT
        const token = jwt.sign(
            { id: newUser.insertedId},
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        // 7. Return results
        res.status(201).json({
            message: "User registered successfully.",
            token,
            user: {
                firstName,
                lastName,
                email: normalizedEmail,
            }
        });

    } catch(error) {
        logger.error({ err:error }, 'Unhandled error during registration play.');
        res.status(500).json({ error: 'Internal server error on the court.'});
    }

});

module.exports = router;
