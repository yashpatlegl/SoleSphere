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



      
function displayShoes(shoes) {
  shoeContainer.innerHTML = "";
  shoes.forEach(shoe => {
      const shoeDiv = document.createElement("div");
      shoeDiv.style.display = "flex";
      shoeDiv.style.flexDirection = "column";
      shoeDiv.style.textAlign = "center";

      shoeDiv.classList.add("items");
      shoeDiv.innerHTML = `
          <div class="card" style="background-image: url('images/${shoe.image_path}');"></div>
          <p><strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
          <br> <button class="wishlist-btn" data-model="${shoe.model}" style="background-color: #DFD0B8; border:none; border-radius:5rem; padding:0.5rem">
              ADD TO WISHLIST <i class="fa fa-heart"></i>
          </button></p>
      `;

      shoeContainer.appendChild(shoeDiv);
  });

  // Add event listeners to all wishlist buttons
  document.querySelectorAll(".wishlist-btn").forEach(button => {
      button.addEventListener("click", function() {
          const model = this.getAttribute("data-model");
          addToWishlist(model);
      });
  });
}


    });

//   // Function to display shoes dynamically
//   function displayShoes(shoes) {
//       shoeContainer.innerHTML = "";
//       shoes.forEach(shoe => {
//           const shoeDiv = document.createElement("div");
//           shoeDiv.style.display = "flex";
//           shoeDiv.style.flexDirection="column";
//           shoeDiv.style.textAlign="center";


//           shoeDiv.classList.add("items");
//           shoeDiv.innerHTML = `
//               <div class="card" style="background-image: url('images/${shoe.image_path}');"></div>
//               <p><strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
//               <br> <button  style="background-color: #DFD0B8; border:none; border-radius:5rem;  padding:0.5rem">ADD TO WISHLIST<i class="fa fa-heart"></i></button></p>
//           `;
//           shoeContainer.appendChild(shoeDiv);
//       });
//   }
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


  
   function addToWishlist(model) {
    event.preventDefault();

    const email = sessionStorage.getItem('email');
    

    if (!email || !model) {
        alert("Both email and model fields are required.");
        return;
    }

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
  
  // Initialize navbar on page load
window.onload = updateNavbar;
