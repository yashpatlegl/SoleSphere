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

