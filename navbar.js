document.addEventListener("DOMContentLoaded", () => {
  const shoeContainer = document.getElementById("shoe-container");

  // Fetch data from shoes.json
  fetch("shoes.json")
      .then(response => response.json())
      .then(data => {
          const shoes = data.shoes;
          displayShoes(shoes);

          document.querySelectorAll(".filter-btn").forEach(button => {
              button.addEventListener("click", () => {
                  const brand = button.getAttribute("data-brand");
                  const filteredShoes = brand === "all" ? shoes : shoes.filter(shoe => shoe.brand.toLowerCase() === brand);
                  displayShoes(filteredShoes);
              });
          });
      })
      .catch(error => console.error("Error fetching shoe data:", error));

  // Function to display shoes dynamically
  function displayShoes(shoes) {
      shoeContainer.innerHTML = "";
      shoes.forEach(shoe => {
          const shoeDiv = document.createElement("div");
          shoeDiv.style.display = "flex";
          shoeDiv.style.flexDirection="column";
          shoeDiv.style.textAlign="center";


          shoeDiv.classList.add("items");
          shoeDiv.innerHTML = `
              <div class="card" style="background-image: url('images/${shoe.image_path}');"></div>
              <p><strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
              <br> <button><i class="fa fa-heart"></i></button></p>
          `;
          shoeContainer.appendChild(shoeDiv);
      });
  }
});

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
