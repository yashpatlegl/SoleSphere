// // function fetchdata(){fetch("./shoes.json")
// //     .then(response => response.json())
// //     .then(data =>{
// //         console.log(data.shoes);
// //     })

// //     .catch(error => console.error('cannot find json ',error));
// // }

// // // fetchdata();


// const data=require('../shoes.json');
// const shoesData=data;
// // // console.log(t.shoes[1]);



// function findElementIndex(jsonData, searchKey, searchValue) {
//     const index = jsonData.shoes.findIndex(shoe => shoe[searchKey] === searchValue);
    
//     if (index !== -1) {
//         // console.log(jsonData.shoes[2]);
//       console.log(`Element found at index: ${index}`);
//     } else {
//       console.log("Element not found.");
//     }
//     return jsonData.shoes[index];
//   }
  
//   // Example usage
//   jsonreturned=findElementIndex(shoesData, "model", "UltraBoost 21");
// // console.log(json)

// console.log(jsonreturned);



// const fs = require('fs');
// const data = require('./shoes.json');
// const wishlistFile = './wishlist.json';

// // Function to find the index of a shoe in the JSON data
// function findElementIndex(jsonData, searchKey, searchValue) {
//     return jsonData.shoes.findIndex(shoe => shoe[searchKey] === searchValue);
// }

// // Function to add an item to the wishlist based on email
// function addToWishlist(email, shoeIndex) {
//     let wishlist = {};

//     // Load existing wishlist data if the file exists
//     if (fs.existsSync(wishlistFile)) {
//         const rawData = fs.readFileSync(wishlistFile);
//         wishlist = JSON.parse(rawData);
//     }

//     // Initialize wishlist for the email if it doesn't exist
//     if (!wishlist[email]) {
//         wishlist[email] = [];
//     }

//     // Add the shoe index if it's not already in the list
//     if (!wishlist[email].includes(shoeIndex)) {
//         wishlist[email].push(shoeIndex);
//     }

//     // Save updated wishlist back to file
//     fs.writeFileSync(wishlistFile, JSON.stringify(wishlist, null, 2));
//     console.log(`Wishlist updated for ${email}:`, wishlist[email]);
// }

// // Example usage
// const email = "user@example.com"; // Replace with actual user email
// const shoeIndex = findElementIndex(data, "model", "UltraBoost 21");

// if (shoeIndex !== -1) {
//     addToWishlist(email, shoeIndex);
// } else {
//     console.log("Shoe not found.");
// }






const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

const app = express();
const PORT = 3000;
const wishlistFile = './wishlist.json';
const shoesData = require('./shoes.json');
const { log } = require('console');

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
