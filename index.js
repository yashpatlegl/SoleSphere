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
            shoeDiv.classList.add("items");
            shoeDiv.innerHTML = `
                <div class="card" style="background-image: url('images/${shoe.image_path}');"></div>
                <p><strong>${shoe.brand}</strong> - ${shoe.model} <br> $${shoe.price}</p>
            `;
            shoeContainer.appendChild(shoeDiv);
        });
    }
  });
  
  // Navbar update function for user login/logout