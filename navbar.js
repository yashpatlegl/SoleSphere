function updateNavbar() {
    let iconDiv = document.querySelector(".icon");
    event.preventDefault();

    // Clear only user-related icons (wishlist, shopping bag, logout)
    iconDiv.innerHTML = "";

    // Always re-add Signup & Contact icons
    let signupIcon = document.createElement("i");
    signupIcon.className = "fa fa-sign-up";  // Make sure your actual class names match
    signupIcon.style.fontSize = "24px";

    let contactIcon = document.createElement("i");
    contactIcon.className = "fa fa-contact"; // Ensure correct class names
    contactIcon.style.fontSize = "24px";

    iconDiv.appendChild(signupIcon);
    iconDiv.appendChild(contactIcon);

    if (sessionStorage.getItem("userLoggedIn") === "true") {
        event.preventDefault();
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

       
        // event.preventDefault();
    }
}
event.preventDefault();
     
window.onload = updateNavbar;