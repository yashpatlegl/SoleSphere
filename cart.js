

function fetchCartItem() {
  const email = sessionStorage.getItem("email");
  const wishlistContainer = document.getElementById("collectionbox");
  const bill1 = document.getElementById("bill");
  let count = document.getElementById("cartCount");


  if (!wishlistContainer) {
    console.error("Cart container not found in the DOM.");
    return;
  }

  if (!email) {
    alert("Please enter a valid email!");
    return;
  }

  fetch(`http://localhost:3000/cart/${email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Cart Data:", data);
      count.innerHTML=`TOTAL ITEMS: ${Object.keys(data.cartItems).length}`;

      wishlistContainer.innerHTML = "";
      let totalBill = 0; 

      if (data.cartItems && data.cartItems.length > 0) {
        data.cartItems.forEach((details, index) => {
          const boxItem = document.createElement("div");
          boxItem.className = "box";

          
          const photoItem = document.createElement("div");
          photoItem.className = "photo";
          photoItem.style.width = "30%";
          photoItem.style.height = "95%";
          photoItem.style.borderRadius="1rem"
          photoItem.style.backgroundImage = `url('images/${details.image_path}')`;
          photoItem.style.backgroundSize = "cover";

     
          const itemElement = document.createElement("div");
          itemElement.style.borderRadius="1rem";
          itemElement.className = "information";
          itemElement.innerHTML = `
                        <p><strong>Model: ${details.model}</strong></p>
                        <p><strong>Price: $${details.price}</strong></p>
                        <p><strong>Size:</strong> 
                            <select>
                                <option>Pink</option>
                                <option>Blue</option>
                                <option>Orange</option>
                                <option>Red</option>
                            </select>
                        </p>
                        <p><strong>Quantity:</strong> 
                        <div class="cartdelete">
                            <select class="quantity-selector" data-price="${details.price}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select><button class="trash"><i class="fa fa-trash" aria-hidden="true" style="font-size:1.5rem" onclick="removeCart('${email}','${details.model}')"></i></button></div>
                        </p>
                    `;

          boxItem.appendChild(photoItem);
          boxItem.appendChild(itemElement);
          wishlistContainer.appendChild(boxItem);
          totalBill += details.price;
        });

        

       
        bill1.innerHTML = "";
        const totalBillElement = document.createElement("div");
        totalBillElement.innerHTML = `
                    <p style="font-size:20px">Here is the Total Bill For Your Orders!!</p><br>
                    <h2 id="total-bill">Your Grand Total is: $${totalBill}</h2>
                `;
        bill1.appendChild(totalBillElement);

        
        document.querySelectorAll(".quantity-selector").forEach((select) => {
          select.addEventListener("change", updateTotalBill);
        });
        totalBill.innerHTML = `${data.totalBill}`;

        function updateTotalBill() {
          totalBill = 0; 
          document.querySelectorAll(".quantity-selector").forEach((select) => {
            const quantity = parseInt(select.value);
            const price = parseFloat(select.getAttribute("data-price"));
            totalBill += quantity * price;
          });

          
          document.getElementById(
            "total-bill"
          ).innerText = `Your Grand Total is: $${totalBill}`;
        }
        const bolt = document.createElement("button");
        bolt.className = "button-43";
        bolt.innerText = "Confirm Order";
        bolt.onclick = function () {
            const email = sessionStorage.getItem("email");
            window.location.href = "thankyou.html";
          fetch(`http://localhost:3000/clear-cart/${email}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(console.log("yes yes "))
            .catch((error) => {
              console.error("Error clearing cart:", error);
              alert("An error occurred.");

              alert(error);
            });

          
          wishlistContainer.innerHTML = "";
        };
        bill1.appendChild(totalBillElement);
        bill1.appendChild(bolt);
      } else {
        wishlistContainer.innerHTML = "<p><i>Your Wish List is Empty!!!🗒️</i></p><br><p>Go and grab your favourites in your list before the deal ends 🕰️</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching cart:", error);
      wishlistContainer.innerHTML =
        "<p>Something went wrong. Please try again later.</p>";
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




function removeCart(email, model) {
  if (!email || !model) {
      alert("Invalid session or item.");
      return;
  }

  console.log(`Sending DELETE request for model: ${model}, email: ${email}`);

  fetch("http://localhost:3000/remove-from-cart", {
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
          alert("Item successfully removed from cart!");
          // document.querySelector(`.trash[data-model="${model}"]`).closest(".box").remove();
      } else {
          alert("Failed to remove item.");
      }
  })
  .catch((error) => {
      console.error("Error removing item:", error);
      alert("An error occurred. Please try again.");
  });
}



document.addEventListener("DOMContentLoaded", fetchCartItem);
