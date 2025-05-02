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
    const array_wish=wishlist[email];
    const res_json ={};
    array_wish.forEach(element => {
        res_json[element] = shoesData.shoes[element];
    });
    console.log(res_json);
    res.json(res_json);
    
    // res.json({ wishlist: wishlist[email] });
});



const cartFile = './cart.json';

// Endpoint to add an item from wishlist to cart
app.post('/add-to-cart', (req, res) => {
    const { email, model } = req.body;
    if (!email || !model) {
        return res.status(400).json({ message: "Email and model are required." });
    }

    const shoeIndex = findElementIndex(shoesData, "model", model);
    if (shoeIndex === -1) {
        return res.status(404).json({ message: "Shoe not found." });
    }

    let cart = {};

    // Load existing cart data if the file exists
    if (fs.existsSync(cartFile)) {
        const rawData = fs.readFileSync(cartFile);
        cart = JSON.parse(rawData);
    }

    // Initialize cart for the email if it doesn't exist
    if (!cart[email]) {
        cart[email] = [];
    }

    // Add the shoe to the cart if it's not already there
    if (!cart[email].includes(shoeIndex)) {
        cart[email].push(shoeIndex);
    }

    // Save updated cart back to file
    fs.writeFileSync(cartFile, JSON.stringify(cart, null, 2));
    res.json({ message: `Cart updated for ${email}`, cart: cart[email] });
});

// Endpoint to get a user's cart and calculate total bill
app.get('/cart/:email', (req, res) => {
    const email = req.params.email;

    if (!fs.existsSync(cartFile)) {
        console.log("asd")
        return res.status(404).json({ message: "No cart found." });
    }

    const cart = JSON.parse(fs.readFileSync(cartFile));

    if (!cart[email]) {
        return res.status(404).json({ message: "No cart found for this email." });
    }

    const cartItems = cart[email].map(index => shoesData.shoes[index]);
    const totalBill = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    // console.log ({ cartItems, totalBill });
    res.json({ cartItems, totalBill });
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
