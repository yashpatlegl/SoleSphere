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



      
// function displayShoes(shoes) {
//   shoeContainer.innerHTML = "";
//   shoeContainer.style.gap ="1rem";
//   shoes.forEach(shoe => {
//       const shoeDiv = document.createElement("div");
//       shoeDiv.style.display = "flex";
//       shoeDiv.style.flexDirection = "column";
//       shoeDiv.style.textAlign = "center";
//       shoeDiv.style.backgroundColor="#F1F0E8"
//       shoeDiv.style.borderRadius="2rem";
//       shoeDiv.style.transition="transform 0.3s ease-in-out";
//       shoeDiv.addEventListener("mouseover", ()=>
//     {
//         shoeDiv.style.transform="scale(1.1)"
//     });
//     shoeDiv.addEventListener("mouseout", ()=>
//     {
//         shoeDiv.style.transform="scale(1)"
//     });

//       shoeDiv.classList.add("items");
//       shoeDiv.innerHTML = `
//           <div class="card" style="border-radius:2rem; object-fit: cover; background-size: cover; background-image: url('images/${shoe.image_path}'); "></div>
//           <p><strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
//           <br> <button class="wishlist-btn" data-model="${shoe.model}" style="background-color: #DFD0B8; border:none;  padding:0.5rem">
//               ADD TO WISHLIST <i class="fa fa-heart"></i>
//           </button></p>
//       `;

//       shoeContainer.appendChild(shoeDiv);
//   });

//   // Add event listeners to all wishlist buttons
//   document.querySelectorAll(".wishlist-btn").forEach(button => {
//       button.addEventListener("click", function() {
//           const model = this.getAttribute("data-model");
//           addToWishlist(model);
//       });
//   });
// }
function displayShoes(shoes) {
    shoeContainer.innerHTML = "";
    shoeContainer.style.gap = "1rem";
  
    shoes.forEach(shoe => {
        const shoeDiv = document.createElement("div");
        shoeDiv.style.display = "flex";
        shoeDiv.style.flexDirection = "column";
        shoeDiv.style.alignItems = "center";
        shoeDiv.style.justifyContent="center";
        shoeDiv.style.textAlign = "center";
        shoeDiv.style.height="80%"
        // shoeDiv.style.backgroundColor = "#F1F0E8";
        shoeDiv.style.borderRadius = "2rem";
        shoeDiv.style.transition = "transform 0.3s ease-in-out";
        shoeDiv.style.position = "relative"; 
  
        // Hover Effect - Scale on Hover
        shoeDiv.addEventListener("mouseover", () => {
            shoeDiv.style.transform = "scale(1.1)";
            shoeText.style.display = "block"; // Show text on hover
            shoeDiv.style.backgroundColor = "#F1F0E8"
        });
        shoeDiv.addEventListener("mouseout", () => {
            shoeDiv.style.transform = "scale(1)";
            shoeText.style.display = "none"; // Hide text when not hovering
            shoeDiv.style.backgroundColor="white";
        });
  
        shoeDiv.classList.add("items");
  
        // Shoe Image
        const shoeImage = document.createElement("div");
        shoeImage.classList.add("card");
        shoeImage.style.borderRadius = "2rem";
        shoeImage.style.objectFit = "cover";
        shoeImage.style.backgroundSize = "cover";
        shoeImage.style.backgroundImage = `url('images/${shoe.image_path}')`;
        shoeImage.style.width = "100%";
        shoeImage.style.height = "100%";
        shoeImage.style.alignSelf="start"
  
        // Shoe Text Content (Initially Hidden)
        const shoeText = document.createElement("p");
        shoeText.innerHTML = `<strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
            <br> <button class="wishlist-btn" data-model="${shoe.model}" style="background-color: #DFD0B8; border:none; padding:0.5rem">
                ADD TO WISHLIST <i class="fa fa-heart"></i>
            </button>`;
        shoeText.style.display = "none"; // Hide by default
  
        // Append elements
        shoeDiv.appendChild(shoeImage);
        shoeDiv.appendChild(shoeText);
        shoeContainer.appendChild(shoeDiv);
    });
  
    // Wishlist button functionality
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
