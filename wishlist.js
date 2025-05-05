function addToCart(model) {
  console.log(`Adding ${model}  to cart...`);
  //   alert(`${model} added to cart!`);
  event.preventDefault();

  const email = sessionStorage.getItem("email");
  if (!email || !model) {
    alert("Please sign in to add you favourites in your list❤️");
    return;
  }
    alert("Item Added to Cart!!");
    event.preventDefault();

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
          photoitem.style.width = "15rem";
          photoitem.style.height = "15rem";
          photoitem.style.borderRadius="1rem";
          photoitem.style.backgroundImage = `url('images/${details.image_path}')`;
          photoitem.style.backgroundSize = "cover";
          itemElement.style.borderRadius="1rem";

          itemElement.className = "information";
          itemElement.innerHTML = `
          <p class="model-name" style="font-size:1.5rem;">
          <strong style="font-size:1.5rem">Brand: 
          ${details.brand}</strong></p>

          <p class="model-name"><strong style="font-size:1.5rem; font-style:Times New Roman">Model :${
            details.model
          }</strong></p>
                        <p style="font-size:1.5rem"><strong>Price: $${
                          details.price
                        }<strong></p><div style="object-fit: cover; heigth: 2rem" >
          <div class="cartdelete">
          <button 
    style="align-self: flex-end; " 
    class="button-43" 
    onclick="addToCart('${details.model.replace(/'/g, `\\'`)}')">
    ADD TO CART
</button>
<button class="trash"><i class="fa fa-trash" aria-hidden="true" style="font-size:1.5rem" onclick="removewishlist('${email}','${
            details.model
          }')"></i></button></div>
`;

          boxiteam.appendChild(photoitem);
          boxiteam.appendChild(itemElement);

          wishlistContainer.appendChild(boxiteam);
        });
      } else {
        wishlistContainer.innerHTML =
          "<p><i>Your Wish List is Empty!!!🗒️</i></p><br><p>Go and grab your favourites in your list before the deal ends 🕰️</p>";
      }
      // document.querySelectorAll(".button-43").forEach((button) => {
      //   button.addEventListener("click", function () {
      //     const model = this.getElementByClass("model-name");
      //     addToCart(model);
      //   });
      // });
    })
    .catch((error) => {
      console.error("Error fetching wishlist:", error);
      wishlistContainer.innerHTML =
        "<p>Something went wrong. Please try again later.</p>";
    });

  
}

function removewishlist(email, model) {
  // let itemToRemove = this.closest(".box");

  // const email = this.email;
  console.log(model);
  if (!email || !model) {
    alert("Invalid session or item.");
    return;
  }

  console.log(`Sending DELETE request for model: ${model}, email: ${email}`);

  fetch("http://localhost:3000/remove-from-wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, model }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      if (data.success) {
        alert("Item successfully removed from wishlist!");
      } else {
        alert("Failed to remove item.");
      }
    })
    .catch((error) => {
      console.error("Error removing item:", error);
      alert("An error occurred. Please try again.");
    });
}

document.getElementById("toggleTheme").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  
  if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
  } else {
      localStorage.setItem("theme", "light");
  }
});


window.addEventListener("load", function () {
  if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      // this.document.getElementById("toggleTheme").style.color="white";
      const ii = this.document.getElementById("#toggleTheme");
      ii.style.color="black";
  }
});


document.addEventListener("DOMContentLoaded", fetchWishlist);
