const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config(); // For loading environment variables
const router = express.Router();
const { Password } = require('./models');

// Endpoint 1: Retrieve hashedPassword
router.put('/hashed-password', async (req, res) => {
    try {
        const oldPassword = req.body.oldPassword;
        let passwordData = await Password.findOne({});
        if (!passwordData) {
            await setPassword(req, res);
            passwordData = await Password.findOne({});
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, passwordData.hashedPassword);
        if (!isPasswordMatch) {
            return res.status(403).json('Incorrect password');
        } else return res.status(200).json('Success');
    } catch (error) {
        res.status(500).json('Error: ' + error);
    }
});

const setPassword = async (req, res) => {
    const newPassword = process.env.FIRST_PASSWORD.trim();
    if (!newPassword) {
        res.status(400).json('FIRST_PASSWORD not set in environment');
        return;
    }

    // Encrypt the new password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    try {
        // Update the hashed password in the database
        await Password.findOneAndUpdate({}, { hashedPassword }, { upsert: true });
        res.json('Password set successfully');
    } catch (error) {
        res.status(500).json('Error: ' + error);
    }
}

// Endpoint 2: Set password (used only once, retrieved from .env)
router.post('/set-password', setPassword);

// Endpoint 3: Reset password
router.post('/reset-password', async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Retrieve the hashed saved password from the database
    try {
        const passwordData = await Password.findOne({});
        if (!passwordData) {
            res.status(404).json('Password data not found');
            return;
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, passwordData.hashedPassword);
        if (!isPasswordMatch) {
            res.status(403).json('Incorrect old password');
            return;
        }

        // Encrypt the new password using bcrypt
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the hashed password in the database
        await Password.findOneAndUpdate({}, { hashedPassword: hashedNewPassword }, { upsert: true });
        res.status(200).json('Password reset successful');
    } catch (error) {
        res.status(500).json('Error: ' + error);
    }
});

module.exports = router;