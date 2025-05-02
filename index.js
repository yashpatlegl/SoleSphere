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
              <br> <button class="wishlist-btn" data-model="${shoe.model}" style="background-color: #DFD0B8; border:none; padding:0.5rem; border-radius:1rem">
                   🩵 ADD TO WISHLIST
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