function addToCart(model) {
  console.log(`Adding ${model}  to cart...`);
  //   alert(`${model} added to cart!`);
  event.preventDefault();

  const email = sessionStorage.getItem("email");
  if (!email || !model) {
    alert("Both email and model fields are required.");
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

function fetchWishlist() {
  const email = sessionStorage.getItem("email");
  const wishlistContainer = document.getElementById("collectionbox");
  const wishlistcount = document.getElementById("wishlistCount");

  if (!wishlistContainer) {
    console.error("Wishlist container not found in the DOM.");
    return;
  }

  if (!email) {
    alert("Please enter a valid email!");
    return;
  }

  fetch(`http://localhost:3000/wishlist/${email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      wishlistcount.innerHTML = `TOTAL ITEMS: ${Object.keys(data).length}`;
      if (data && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([item, details]) => {
          const boxiteam = document.createElement("div");
          boxiteam.className = "box";
          // boxiteam.style.display="flex";
          const itemElement = document.createElement("div");
          const photoitem = document.createElement("div");
          photoitem.className = "photo";
          photoitem.style.width = "15em";
          photoitem.style.height = "15em";
          photoitem.style.backgroundImage = `url('images/${details.image_path}')`;
          photoitem.style.backgroundSize = "cover";

          itemElement.className = "information";
          itemElement.innerHTML = `
          <p style="font-size:1.5rem class="model-name"><strong style="font-size:1.5rem">Brand: ${
            details.brand
          }</strong></p>
                        <p style="font-size:1.5rem class="model-name"><strong style="font-size:1.5rem">Model :${
                          details.model
                        }</strong></p>
                        <p style="font-size:1.5rem"><strong>Price: $${
                          details.price
                        }<strong></p><div style="object-fit: cover; heigth: 2rem" >
                       <div class="cartdelete"><button 
    style="align-self: flex-end; " 
    class="button-43" 
    onclick="addToCart('${details.model.replace(/'/g, `\\'`)}')">
    ADD TO CART
</button><button class="trash"><i class="fa fa-trash" aria-hidden="true" style="font-size:1.5rem"></i></button></div>
`;

          boxiteam.appendChild(photoitem);
          boxiteam.appendChild(itemElement);

          wishlistContainer.appendChild(boxiteam);
        });
      } else {
        wishlistContainer.innerHTML =
          "<p>No wishlist found for this email.</p>";
      }
      //   document.querySelectorAll(".button-43").forEach((button) => {
      //     button.addEventListener("click", function () {
      //       const model = this.getElementByClass("model-name");
      //       addToCart(model);
      //     });
      //   });

      document.querySelectorAll(".trash").forEach((button) => {
             button.addEventListener("click", function () {
               let itemToRemove = this.closest(".box");
               if(itemToRemove){
                itemToRemove.remove()
               }
             });
           });
    })
    .catch((error) => {
      console.error("Error fetching wishlist:", error);
      wishlistContainer.innerHTML =
        "<p>Something went wrong. Please try again later.</p>";
    });
}

// Example function to handle adding to cart

// Call fetchWishlist on page load
document.addEventListener("DOMContentLoaded", fetchWishlist);
