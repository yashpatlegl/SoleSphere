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
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("userLoggedIn", "true");
        updateNavbar();
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
    let iconDiv = document.querySelector(".icon");
    
    // Check user login status
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      // Create wishlist icon
      let wishlink = document.createElement("a");
      wishlink.href = "wishlist.html";

      let wishlistIcon = document.createElement("i");
      wishlistIcon.className = "fa fa-heart";
      wishlistIcon.style.fontSize = "24px";
      wishlink.appendChild(wishlistIcon);
  
      // Create shopping bag icon
      let shoppingBagIcon = document.createElement("i");
      shoppingBagIcon.className = "fa fa-shopping-bag";
      shoppingBagIcon.style.fontSize = "24px";
  
      // Create logout button
      let logoutButton = document.createElement("button");
      logoutButton.setAttribute("id", "ayushi");
      logoutButton.textContent = "Logout";
      logoutButton.style.marginLeft = "10px";
      logoutButton.style.padding = "5px 10px";
      logoutButton.style.border = "none";
      logoutButton.style.backgroundColor = "red";
      logoutButton.style.color = "white";
      logoutButton.style.cursor = "pointer";
  
      // Append user-related icons
      iconDiv.appendChild(wishlink);
      iconDiv.appendChild(shoppingBagIcon);
      iconDiv.appendChild(logoutButton);
  
      // Add event listener to logout button
      logoutButton.addEventListener("click", function() {
        // Remove wishlist and shopping bag icons
        if (wishlistIcon && shoppingBagIcon) {
          iconDiv.removeChild(wishlistIcon);
          iconDiv.removeChild(shoppingBagIcon);
        }
      });
    }
  }
  
  // Initialize navbar on page load
  window.onload = updateNavbar;
  




