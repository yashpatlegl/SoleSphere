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
                shoeText.style.display = "block";
                wishButtonDiv.style.display="block"; // Show text on hover
                shoeDiv.style.backgroundColor = "#F1F0E8";
                CartButtonDiv.style.display="block";
                quickView.style.display="block";

            });
            shoeDiv.addEventListener("mouseout", () => {
                shoeDiv.style.transform = "scale(1)";
                shoeText.style.display = "none"; 
                wishButtonDiv.style.display="none"// Hide text when not hovering
                shoeDiv.style.backgroundColor="white";
                CartButtonDiv.style.display="none";
                quickView.style.display="none";

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
            shoeImage.style.position="relative";

            const wishButtonDiv = document.createElement("div");
            wishButtonDiv.innerHTML=`<button class="wishlist-btn" data-model="${shoe.model}" style="font-size:1.5rem; background-color: #DFD0B8; border:none; padding:0.5rem; border-radius:1rem">
                    💙
                </button>`;
                wishButtonDiv.style.position="absolute";
                wishButtonDiv.style.zIndex ="10";
                wishButtonDiv.style.top="1rem";
                wishButtonDiv.style.right="1rem";
                wishButtonDiv.style.display="none";

                shoeImage.appendChild(wishButtonDiv);


            const CartButtonDiv = document.createElement("div");
            CartButtonDiv.innerHTML=`<button class="cart-button-div" data-model="${shoe.model}" style="font-size:1.5rem; background-color: #DFD0B8; border:none; padding:0.5rem; border-radius:1rem">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>`  ;
                CartButtonDiv.style.position="absolute";
                CartButtonDiv.style.zIndex="10";
                CartButtonDiv.style.top="5rem";
                CartButtonDiv.style.right="1rem";
                CartButtonDiv.style.display="none";

                shoeImage.appendChild(CartButtonDiv);

            let quickView = document.createElement("div");
            quickView.innerHTML =document.createElement("div");
            quickView.innerHTML=`<button class="quick-view-button" data-model="${shoe.model}" style="font-size:1.5rem; background-color: #DFD0B8; border:none; padding:0.5rem; border-radius:1rem">
                    🔎
                </button>`  ; 
                quickView.style.position="absolute";
                quickView.style.zIndex="10";
                quickView.style.top="9rem";
                quickView.style.right="1rem";
                quickView.style.display="none";

                shoeImage.appendChild(quickView);





            


            
    
            // const showbrand = document.createElement("h3");
            // showbrand.innerHTML=`<strong>${shoe.brand}</strong>`;
    
        
            const shoeText = document.createElement("p");
            shoeText.innerHTML = `<strong style="font-size:1.5rem;">${shoe.brand}</strong> - ${shoe.model}<br><strong style="color:aquablue"> $${shoe.price} </strong>
                <br>
               
                
                `;
            shoeDescription = document.createElement("div");
            // shoeDescription.innerHTML=`<strong>${shoe.description} </strong>` ;
            // shoeDescription.display="none";   
            // shoeText.style.display = "none"; // Hide by default
        
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


        // document.querySelectorAll(".quick-view-button").forEach(button=>
        // {
        //     button.addEventListener("click", function(){
        //         let view = document.createElement("div");
        //         const model = this.getAttribute("data-model");
        //         const description = shoes.fil
                
        //         view.innerHTML=`<strong>${description} </strong>`;
        //         shoeDiv.appendChild(view);
        //     })
        // }
        // )



        document.querySelectorAll(".cart-button-div").forEach(button =>{
            button.addEventListener("click", function(){
                const model = this.getAttribute("data-model");
                addToCart(model);
            } )
        })
        } 
    



        document.getElementById("toggleTheme").addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
        
            // Save preference in localStorage
            if (document.body.classList.contains("dark-theme")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
        
        // Apply saved theme when page loads
        window.addEventListener("load", function () {
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark-theme");
                // this.document.getElementById("toggleTheme").style.color="white";
                const ii = this.document.getElementById("#toggleTheme");
                ii.style.color="black";
            }
        });



        window.setTimeout(()=>
        {
            alert("You can also switch to light mode to reduce eye strain 💻");
        }, 5000);


        
        
        
        
    });


