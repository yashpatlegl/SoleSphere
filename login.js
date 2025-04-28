// const { log } = require("console");

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


const registerBtn1 = document.getElementById('registerf');
const loginBtn1 = document.getElementById('loginf');


registerBtn1.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn1.addEventListener('click', () => {
    container.classList.remove("active");
});



// Fetch accounts from accounts.json
let accounts = [];
fetch('/backend/accounts.json')
    .then(response => response.json())
    .then(data => {
        accounts = data;
        // console.log('Accounts loaded:', accounts); // For debugging
    });




registerBtn.addEventListener('click', () => {
        const name = document.querySelector('.sign-up input[type="text"]').value;
        const email = document.querySelector('.sign-up input[type="email"]').value;
        const password = document.querySelector('.sign-up input[type="password"]').value;
        console.log(name,email,password);
    
        if (name && email && password) {
            // console.log(JSON.stringify({ username: name, email, password }));
            const response = fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: name, email:email, password:password }),
                // ...
              })    
            .then(response => {
                if (response.ok) {
                    alert('Registration successful! Please sign in.');
                    container.classList.add("active");
                } else if (response.status === 409) {
                    alert('Email is already registered.');
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again later.');
            });
        } else {
            alert('All fields are required for registration.');
        }
    });

// Event listener for Sign In
loginBtn.addEventListener('click', () => {


    const email = document.querySelector('.sign-in input[type="email"]').value;
    const password = document.querySelector('.sign-in input[type="password"]').value;

    const user = accounts.find(account => account.email === email && account.password === password);

    if (user) {
        sessionStorage.setItem("userLoggedIn", "true");
        // updateNavbar();
        console.log(`Login successful: Welcome, ${user.username}!`);
        event.preventDefault();
        // Redirect to index.html
        window.location.href = "index.html";

        // Redirect to another page or display user dashboard here
    } else {
        console.log('Invalid email or password.');
        alert('Invalid email or password. Please try again.');
    }

    container.classList.remove("active"); // Switch to Sign Up
});

function updateNavbar() {
    if (sessionStorage.getItem("userLoggedIn") === "true") {
        let iconDiv = document.querySelector(".icon");

        let wishlistIcon = document.createElement("i");
        wishlistIcon.className = "fa fa-heart";
        wishlistIcon.style.fontSize = "24px";

        let shoppingBagIcon = document.createElement("i");
        shoppingBagIcon.className = "fa fa-shopping-bag";
        shoppingBagIcon.style.fontSize = "24px";

        iconDiv.appendChild(wishlistIcon);
        iconDiv.appendChild(shoppingBagIcon);
    }
}

// Call this function when the page loads
window.onload = updateNavbar;


// // Fetch accounts data
// let accounts = [];
// fetch('accounts.json')
//     .then(response => response.json())
//     .then(data => {
//         accounts = data;
//     });

// // Event listener for Register button
// registerBtn.addEventListener('click', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     if (username && password) {
//         const userExists = accounts.some(account => account.username === username);

//         if (!userExists) {
//             accounts.push({ username, password });
//             console.log('User registered successfully:', { username, password });
//             // Save updated accounts to accounts.json (requires backend)
//             // This is a front-end simulation
//         } else {
//             console.log('User already exists!');
//         }
//     } else {
//         console.log('Please fill in both username and password.');
//     }

//     container.classList.add("active");
// });

// // Event listener for Login button
// loginBtn.addEventListener('click', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const user = accounts.find(account => account.username === username && account.password === password);

//     if (user) {
//         console.log('Login successful:', { username });
//         // Redirect to another page or perform actions on successful login
//     } else {
//         console.log('Invalid username or password.');
//     }

//     container.classList.remove("active");
// });
