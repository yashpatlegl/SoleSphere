
function updateNavbar() {
    let iconDiv = document.querySelector(".icon");
    
    // Check user login status
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      // Create wishlist icon
      let wishlistIcon = document.createElement("i");
      wishlistIcon.className = "fa fa-heart";
      wishlistIcon.style.fontSize = "24px";
  
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
      iconDiv.appendChild(wishlistIcon);
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
  