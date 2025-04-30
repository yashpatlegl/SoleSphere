const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");
// const { log } = require('console');

const app = express();
app.use(cors());
const PORT = 3000;


const wishlistFile = './wishlist.json';
const shoesData = require('./shoes.json');
const { log } = require('console');

app.use(cors());






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




// Function to find the index of a shoe in the JSON data
function findElementIndex(jsonData, searchKey, searchValue) {
    return jsonData.shoes.findIndex(shoe => shoe[searchKey] === searchValue);
}

// Endpoint to add an item to the wishlist
app.post('/add-to-wishlist', (req, res) => {
    const { email, model } = req.body;
    if (!email || !model) {
        return res.status(400).json({ message: "Email and model are required." });
    }

    const shoeIndex = findElementIndex(shoesData, "model", model);

    if (shoeIndex === -1) {
        return res.status(404).json({ message: "Shoe not found." });
    }

    let wishlist = {};

    // Load existing wishlist data if the file exists
    if (fs.existsSync(wishlistFile)) {
        const rawData = fs.readFileSync(wishlistFile);
        wishlist = JSON.parse(rawData);
    }
    else console.log("not able to read");
    

    // Initialize wishlist for the email if it doesn't exist
    if (!wishlist[email]) {
        wishlist[email] = [];
    }
    else console.log("not able to find and do ");
    

    // Add the shoe index if it's not already in the list
    if (!wishlist[email].includes(shoeIndex)) {
        wishlist[email].push(shoeIndex);
    }
    else console.log("withlist added not ");
    

    // Save updated wishlist back to file
    fs.writeFileSync(wishlistFile, JSON.stringify(wishlist, null, 2));
    res.json({ message: `Wishlist updated for ${email}`, wishlist: wishlist[email] });
});

// Endpoint to get a user's wishlist
app.get('/wishlist/:email', (req, res) => {
    const email = req.params.email;

    if (!fs.existsSync(wishlistFile)) {
        console.log(res.status(404).json({ message: "No wishlist found." }));
        
        return res.status(404).json({ message: "No wishlist found." });
    }

    const wishlist = JSON.parse(fs.readFileSync(wishlistFile));

    if (!wishlist[email]) {
        console.log(res.status(404).json({ message: "No wishlist found for this email." }));
        
        return res.status(404).json({ message: "No wishlist found for this email." });
    }

    res.json({ wishlist: wishlist[email] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
