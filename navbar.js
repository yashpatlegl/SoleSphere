
function updateNavbar() {
  let iconDiv = document.querySelector(".icon");

  if (sessionStorage.getItem("userLoggedIn") === "true") {
      let wishlistIcon = document.createElement("i");
      wishlistIcon.className = "fa fa-heart";
      wishlistIcon.style.fontSize = "24px";

      let shoppingBagIcon = document.createElement("i");
      shoppingBagIcon.className = "fa fa-shopping-bag";
      shoppingBagIcon.style.fontSize = "24px";

      let logoutButton = document.createElement("button");
      logoutButton.setAttribute("id", "logout-button");
      logoutButton.textContent = "Logout";
      logoutButton.style.marginLeft = "10px";
      logoutButton.style.padding = "5px 10px";
      logoutButton.style.border = "none";
      logoutButton.style.backgroundColor = "red";
      logoutButton.style.color = "white";
      logoutButton.style.cursor = "pointer";

      iconDiv.appendChild(wishlistIcon);
      iconDiv.appendChild(shoppingBagIcon);
      iconDiv.appendChild(logoutButton);

      logoutButton.addEventListener("click", function () {
          sessionStorage.removeItem("userLoggedIn");
          location.reload();
      });
  }
}

window.onload = updateNavbar;
