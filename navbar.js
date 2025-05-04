


//   loginBtn.addEventListener('click', () => {


//     const email = document.querySelector('.sign-in input[type="email"]').value;
//     const password = document.querySelector('.sign-in input[type="password"]').value;

//     const user = accounts.find(account => account.email === email && account.password === password);

//     if (user) {
//         sessionStorage.setItem("email", email);
//         sessionStorage.setItem("userLoggedIn", "true");
//         updateNavbar();
//         console.log(`Login successful: Welcome, ${user.username}!`);
//         event.preventDefault();
//         // Redirect to index.html
//         window.location.href = "index.html";

//         // Redirect to another page or display user dashboard here
//     } else {
//         console.log('Invalid email or password.');
//         alert('Invalid email or password. Please try again.');
//     }

//     container.classList.remove("active"); // Switch to Sign Up
// });

// Navbar update function for user login/logout
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

      let bagIcon = document.createElement("a");
      bagIcon.href="cart.html";

      let shoppingBagIcon = document.createElement("i");
      shoppingBagIcon.className = "fa fa-shopping-bag";
      shoppingBagIcon.style.fontSize = "24px";
      bagIcon.appendChild(shoppingBagIcon)
  
      // Create logout button
      let logoutButton = document.createElement("button");
      logoutButton.setAttribute("id", "ayushi");
      logoutButton.textContent = "Logout";
      logoutButton.style.marginLeft = "10px";
      logoutButton.style.padding = "0.5rem";
      logoutButton.style.borderRadius="1.5rem"
      logoutButton.style.border = "none";
      logoutButton.style.backgroundColor="black"
      logoutButton.style.color = "white";
      logoutButton.style.cursor = "pointer";
  
      // Append user-related icons
      iconDiv.appendChild(wishlink);
      iconDiv.appendChild(bagIcon);
      iconDiv.appendChild(logoutButton);
  
      // Add event listener to logout button
      logoutButton.addEventListener("click", function() {
        // Remove wishlist and shopping bag icons
        if (wishlink && bagIcon) {
          iconDiv.removeChild(wishlink);
          iconDiv.removeChild(bagIcon);
          iconDiv.removeChild(logoutButton);
          sessionStorage.clear();
        }
      });
    }
  }


  
   function addToWishlist(model) {
    event.preventDefault();

    const email = sessionStorage.getItem("email");
    

    if (!email || !model) {
        alert("Both email and model fields are required.");
        return;
    }
    alert("Wishlist Updated Succesfully!!");

    const response =  fetch("http://localhost:3000/add-to-wishlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, model })
    });

    const data =  response.json();
    alert(data.message);
  }


  function addToCart(model) {
    console.log(`Adding ${model}  to cart...`);
    //   alert(`${model} added to cart!`);
    event.preventDefault();
  
    const email = sessionStorage.getItem("email");
    if (!email || !model) {
      alert("Both email and model fields are required.");
      return;
    }
    //   alert("Item Added to Cart!!");
  
    const response = fetch("http://localhost:3000/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, model }),
    });
  
    const data = response.json();
    alert(data.message);
  }
  
  // Initialize navbar on page load
window.onload = updateNavbar;
