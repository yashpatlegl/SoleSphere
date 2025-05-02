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
      .catch(error =>console.error("Error fetching shoe data:", error));

function displayShoes(shoes) {
    const shoeContainer = document.getElementById("shoe-container");
    shoeContainer.innerHTML = "";
    // shoeContainer.style.gap = "0.5rem";
  
    shoes.forEach(shoe => {
        const shoeDiv = document.createElement("div");
        shoeDiv.style.display = "flex";
        shoeDiv.style.flexDirection = "column";
        shoeDiv.style.alignItems = "center";
        shoeDiv.style.justifyContent="center";
        shoeDiv.style.textAlign = "center";
        shoeDiv.style.height="80%";
        shoeDiv.style.margin="1.5rem"
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
        shoeImage.style.alignSelf="start";

        // const showbrand = document.createElement("h3");
        // showbrand.innerHTML=`<strong>${shoe.brand}</strong>`;

  
        const shoeText = document.createElement("p");
        shoeText.innerHTML = `<strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price} 
            <br> <button class="wishlist-btn" data-model="${shoe.model}" style="background-color: #DFD0B8; border:none; padding:0.5rem;">
                 <i class="fa fa-heart">ADD TO WISHLIST</i>
            </button>
            
            `;
        shoeText.style.display = "none"; // Hide by default
  
        // Append elements
        shoeDiv.appendChild(shoeImage);
        shoeDiv.appendChild(shoeText);
        // shoeDiv.appendChild(showbrand);
        shoeContainer.appendChild(shoeDiv);
    });
  
    // Wishlist button functionality
    document.querySelectorAll(".wishlist-btn").forEach(button => {
        button.addEventListener("click", function() {
            const model = this.getAttribute("data-model");
            addToWishlist(model);
        });
    });
  } });


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
      logoutButton.style.padding = "5px 10px";
      logoutButton.style.border = "none";
      logoutButton.style.backgroundColor = "red";
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
  
  // Initialize navbar on page load
window.onload = updateNavbar;
