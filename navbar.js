
function updateNavbar() {
    let iconDiv = document.querySelector(".icon");
    
    
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      
      let wishlink = document.createElement("a");
      wishlink.href = "wishlist.html";


let userEmail = sessionStorage.getItem("email"); 


fetch("backend/wishlist.json")
  .then(response => response.json())
  .then(wishlistData => {
    
    let wishlistCountValue = wishlistData[userEmail] ? wishlistData[userEmail].length : 0;
    wishlink.style.position = "relative";
    wishlink.style.display = "inline-block";

    
    let wishlistIcon = document.createElement("i");
    wishlistIcon.className = "fa fa-heart";
    wishlistIcon.style.fontSize = "24px";

    
    let wishlistCount = document.createElement("span");
    wishlistCount.innerText = wishlistCountValue;
    wishlistCount.style.position = "absolute";
    wishlistCount.style.top = "-5px";
    wishlistCount.style.right = "-10px";
    wishlistCount.style.backgroundColor = "red";
    wishlistCount.style.color = "white";
    wishlistCount.style.padding = "4px 6px";
    wishlistCount.style.borderRadius = "50%";
    wishlistCount.style.fontSize = "12px";
    wishlistCount.style.fontWeight = "bold";

    
    wishlink.appendChild(wishlistIcon);
    wishlink.appendChild(wishlistCount);
    // wishlink.appendChild(wishlink);
  })
  .catch(error => console.error("Error loading wishlist.json:", error));

      let bagIcon = document.createElement("a");
      bagIcon.href="cart.html";

 
fetch("backend/cart.json")
  .then(response => response.json())
  .then(cartData => {
    
    let itemCountValue = cartData[userEmail] ? cartData[userEmail].length : 0;

    
    let bagIconWrapper = document.createElement("div");
    bagIconWrapper.style.position = "relative";
    bagIconWrapper.style.display = "inline-block";

    
    let shoppingBagIcon = document.createElement("i");
    shoppingBagIcon.className = "fa fa-shopping-bag";
    shoppingBagIcon.style.fontSize = "24px";

    
    let itemCount = document.createElement("span");
    itemCount.innerText = itemCountValue; 
    itemCount.style.position = "absolute";
    itemCount.style.top = "-5px";
    itemCount.style.right = "-10px";
    itemCount.style.backgroundColor = "red";
    itemCount.style.color = "white";
    itemCount.style.padding = "4px 6px";
    itemCount.style.borderRadius = "50%";
    itemCount.style.fontSize = "12px";
    itemCount.style.fontWeight = "bold";

    
    bagIconWrapper.appendChild(shoppingBagIcon);
    bagIconWrapper.appendChild(itemCount);
    bagIcon.appendChild(bagIconWrapper);
  })
  .catch(error => console.error("Error loading cart.json:", error));





      
      let logoutButton = document.createElement("button");
      logoutButton.setAttribute("id", "ayushi");
      logoutButton.textContent = "Logout";
      logoutButton.style.marginLeft = "10px";
      logoutButton.style.padding = "0.5rem";
      logoutButton.style.borderRadius="1.5rem"
      logoutButton.style.border = "none";
      logoutButton.style.backgroundColor="black"
      logoutButton.style.color = "white";
      logoutButton.style.cursor = "pointer";
      var loginLink = document.querySelector('a[href="/login.html"]');
      if (loginLink) {
          loginLink.remove();
      }
      
      iconDiv.appendChild(wishlink);
      iconDiv.appendChild(bagIcon);
      iconDiv.appendChild(logoutButton);
  
      
      logoutButton.addEventListener("click", function() {
        
        if (wishlink && bagIcon) {
          iconDiv.removeChild(wishlink);
          iconDiv.removeChild(bagIcon);
          iconDiv.removeChild(logoutButton);
          iconDiv.appendChild(loginLink);
          sessionStorage.clear();
          window.location.href="index.html"
        }
      });
    }
  }


  
   function addToWishlist(model) {
    event.preventDefault();

    const email = sessionStorage.getItem("email");
    

    if (!email || !model) {
        alert("Please sign-in to add your favourites in your Wishlist❤️");
        window.location.href = "/login.html";
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


  function addToCart(model) {
    console.log(`Adding ${model}  to cart...`);
    //   alert(`${model} added to cart!`);
    event.preventDefault();
  
    const email = sessionStorage.getItem("email");
    if (!email || !model) {
      alert("Please sign-in to add your favourites in your Cart❤️");
      window.location.href = "/login.html";
      return;
    }
    //   alert("Item Added to Cart!!");
  
    const response = fetch("http://localhost:3000/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, model }),
    });
  
    const data = response.json();
    alert(data.message);
  }
  
window.onload = updateNavbar;
