
// Navbar update function for user login/logout
function updateNavbar() {
    let iconDiv = document.querySelector(".icon");
    
    // Check user login status
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      // Create wishlist icon
      let wishlink = document.createElement("a");
      wishlink.href = "wishlist.html";

// Get the logged-in user's email from sessionStorage
let userEmail = sessionStorage.getItem("email"); // Ensure this is stored during login

// Fetch the wishlist data from wishlist.json
fetch("backend/wishlist.json")
  .then(response => response.json()) // Convert response to JSON
  .then(wishlistData => {
    // Retrieve the array for this user and get its length
    let wishlistCountValue = wishlistData[userEmail] ? wishlistData[userEmail].length : 0;
    wishlink.style.position = "relative";
    wishlink.style.display = "inline-block";

    // Create wishlist heart icon
    let wishlistIcon = document.createElement("i");
    wishlistIcon.className = "fa fa-heart";
    wishlistIcon.style.fontSize = "24px";

    // Create the wishlist count badge
    let wishlistCount = document.createElement("span");
    wishlistCount.innerText = wishlistCountValue; // Set wishlist count dynamically
    wishlistCount.style.position = "absolute";
    wishlistCount.style.top = "-5px";
    wishlistCount.style.right = "-10px";
    wishlistCount.style.backgroundColor = "red";
    wishlistCount.style.color = "white";
    wishlistCount.style.padding = "4px 6px";
    wishlistCount.style.borderRadius = "50%";
    wishlistCount.style.fontSize = "12px";
    wishlistCount.style.fontWeight = "bold";

    // Append elements
    wishlink.appendChild(wishlistIcon);
    wishlink.appendChild(wishlistCount);
    // wishlink.appendChild(wishlink); // Append to the page
  })
  .catch(error => console.error("Error loading wishlist.json:", error));







    
  
      // Create shopping bag icon

      let bagIcon = document.createElement("a");
      bagIcon.href="cart.html";

 
fetch("backend/cart.json")
  .then(response => response.json()) // Convert response to JSON
  .then(cartData => {
    // Retrieve the array for this user and get its length
    let itemCountValue = cartData[userEmail] ? cartData[userEmail].length : 0;

    // Create shopping bag icon wrapper
    let bagIconWrapper = document.createElement("div");
    bagIconWrapper.style.position = "relative";
    bagIconWrapper.style.display = "inline-block";

    // Create shopping bag icon
    let shoppingBagIcon = document.createElement("i");
    shoppingBagIcon.className = "fa fa-shopping-bag";
    shoppingBagIcon.style.fontSize = "24px";

    // Create the number badge
    let itemCount = document.createElement("span");
    itemCount.innerText = itemCountValue; // Set cart count dynamically
    itemCount.style.position = "absolute";
    itemCount.style.top = "-5px";
    itemCount.style.right = "-10px";
    itemCount.style.backgroundColor = "red";
    itemCount.style.color = "white";
    itemCount.style.padding = "4px 6px";
    itemCount.style.borderRadius = "50%";
    itemCount.style.fontSize = "12px";
    itemCount.style.fontWeight = "bold";

    // Append elements
    bagIconWrapper.appendChild(shoppingBagIcon);
    bagIconWrapper.appendChild(itemCount);
    bagIcon.appendChild(bagIconWrapper);
  })
  .catch(error => console.error("Error loading cart.json:", error));





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
      var loginLink = document.querySelector('a[href="/login.html"]');
      if (loginLink) {
          loginLink.remove();
      }
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
          iconDiv.appendChild(loginLink);
          sessionStorage.clear();
          window.location.href="index.html"
        }
      });
    }
  }


  
   function addToWishlist(model) {
    event.preventDefault();

    const email = sessionStorage.getItem("email");
    

    if (!email || !model) {
        alert("Please sign-in to add your favourites in your Wishlist❤️");
        window.location.href = "/login.html";
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
      alert("Please sign-in to add your favourites in your Cart❤️");
      window.location.href = "/login.html";
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
