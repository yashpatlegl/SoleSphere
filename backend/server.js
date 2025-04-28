const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");
// const { log } = require('console');

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Path to accounts.json
const accountsFilePath = './accounts.json';

// API endpoint to handle user registration
app.post('/register', (req, res) => {
    console.log(req.body);
    
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Read accounts.json file
    fs.readFile(accountsFilePath, (err, data) => {
        if (err) {
            console.error('Error reading accounts file:', err);
            return res.status(500).send('Internal server error.');
        }

        const accounts = JSON.parse(data);

        // Check if the user already exists
        const userExists = accounts.some(account => account.email === email);

        if (userExists) {
            return res.status(409).send('Email is already registered.');
        }

        // Add the new user
        accounts.push({ username, email, password });

        // Write updated accounts back to the file
        fs.writeFile(accountsFilePath, JSON.stringify(accounts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to accounts file:', err);
                return res.status(500).send('Internal server error.');
            }

            console.log('User registered successfully:', { username, email });
            res.status(201).send('User registered successfully.');
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
