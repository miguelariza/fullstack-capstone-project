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
        if (!email || !firstName || !lastName) {
            logger.warn({email}, 'Login failed: Missing credentials.');
            return res.status(400).json({error: 'Email is required.'});
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

router.post('/login', async( req, res ) => {
    try {
        const { email, password } = req.body;
        
        //Step 1 - Task 3: Create a Pino logger instance
        logger.child({
            endpoint: '/login',
            email: email
        });
        
        logger.info('Login attemp initiated');

        // 1. Check data passed through inputs
        if (!email || !password) {
            logger.warn({email}, 'Login failed: Missing credentials.');
            return res.status(400).json({error: 'Email and password is required.'});
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 2. Connect to database
        const db = await connectToDatabase();
        // Call gifts collection
        const collection = db.collection('users');

        // 3. Does the user already exist?
        const existingUser = await collection.findOne({ email: normalizedEmail }); 
        if (!existingUser) {
            logger.info({ normalizedEmail }, 'Login blocked: Wrong credentials.');
            return res.status(409).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            logger.info({ normalizedEmail }, 'Login blocked: Wrong credentials.');
            return res.status(409).json({ error: 'Invalid email or password.' });
        }

        const payload = {
            firstName: existingUser.firstName,
            email: existingUser.email
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        delete existingUser.password;

        return res.status(200).json({
            message: 'Authentication successful.',
            token, // Client will store this token for subsequent requests
            user: existingUser
        });

    } catch (error) {
        logger.error({ err:error }, 'Unhandled error during authentication.');
        res.status(500).json({ error: 'Internal server error on the court.'});
    }
});

module.exports = router;
