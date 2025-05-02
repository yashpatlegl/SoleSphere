
// function fetchCartItem() {
//     const email = sessionStorage.getItem('email');
//     const wishlistContainer = document.getElementById('collectionbox');
//     const cart_count = document.getElementById('cartCount')
//     // let allshoes=[];
//     if (!wishlistContainer) {
//         console.error('Cart container not found in the DOM.');
//         return;
//     }

//     if (!email) {
//         alert('Please enter a valid email!');
//         return;
//     }
//     // const shoesData = require('./shoes.json');
//     // console.log(shoesData)

//     fetch(`http://localhost:3000/cart/${email}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log("Cart Data:", data);
//         cart_count.innerHTML=`${Object.keys(data).length}`;

//         if (data && Object.keys(data).length > 0) {
//             Object.entries(data).forEach(([item, details]) =>{
//                 wishlistContainer.innerHTML = "";
//                 data.cartItems.forEach(details => {
//                     const boxItem = document.createElement('div');
//                     boxItem.className = "box";
    
//                     const photoItem = document.createElement('div');
//                     photoItem.className = "photo";
//                     photoItem.style.width = "15em";
//                     photoItem.style.height = "15em";
//                     photoItem.style.backgroundImage = `url('images/${details.image_path}')`;
//                     photoItem.style.backgroundSize = "cover";
//                     // function findElementIndex(jsonData, searchKey, searchValue) {
//                     //     return jsonData.shoes.findIndex(shoe => shoe[searchKey] === searchValue);
//                     // }
//                     const itemElement = document.createElement('div');
//                     itemElement.className = 'information';
//                     // let shoes_div_id="quatity_"+findElementIndex(shoesData, "model",details.model);
//                     // console.log(shoes_div_id);
//                     // allshoes.push(shoes_div_id);
//                     // itemElement.id=shoes_div_id;

//                     itemElement.innerHTML = `
//                         <p style="font-size:1rem"><strong><p>Product Model : ${details.model}</strong></p>
//                          <p style="font-size:1rem"><strong><p>Size : </strong><select>
//                          <option>Pink</option>
//                          <option>Blue</option>
//                          <option>Orange</option>
//                          <option>Red</option>
//                          </select></p>
//                          <p style="font-size:1rem"><strong><p>Color : </strong></p>
//                          <div><p><strong class="quantity" >Select Quantity : <strong><select>
//                          <option>1</option>
//                          <option>2</option>
//                          <option>3</option>
//                          <option>4</option>
//                          </select>
//                          </p>
//                          </div>
//                         <p style="font-size:1rem"><strong>Price: $${details.price}</strong></p>
            
//                     `;
    
//                     // ADD TO CART BUTTON
    
//                     // itemElement.appendChild(addButton);
//                     boxItem.appendChild(photoItem);
//                     boxItem.appendChild(itemElement);
//                     wishlistContainer.appendChild(boxItem);
//                 });
    
//                 // Display total bill at the bottom
//                 const bill1 = document.getElementById("bill");
//                 bill1.innerHTML = "";
//                 const totalBillElement = document.createElement('div');
//                 totalBillElement.innerHTML = `<p style="font-size:20px ">Here is the Total Bill For Your Orders!!</p><br>
//                 <h2>Total Bill: $${data.totalBill}</h2>`;
//                 const bolt = document.createElement("button");
//                 bolt.className="button-43";
//                 bolt.innerText="Confirm Order";
//                 bolt.onclick= function(){
//                     window.location.href="thankyou.html";
//                     wishlistContainer.innerHTML="";

//                 }
//                 bill1.appendChild(totalBillElement);
//                 bill1.appendChild(bolt)

//             }
//             );

            
//         } else {
//             wishlistContainer.innerHTML = '<p>No items found in your cart.</p>';
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching cart:', error);
//         wishlistContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
//     });
// }

// // Load items when the page is ready
// document.addEventListener('DOMContentLoaded', fetchCartItem);




function fetchCartItem() {
    const email = sessionStorage.getItem('email');
    const wishlistContainer = document.getElementById('collectionbox');
    const bill1 = document.getElementById("bill");

    if (!wishlistContainer) {
        console.error('Cart container not found in the DOM.');
        return;
    }

    if (!email) {
        alert('Please enter a valid email!');
        return;
    }

    fetch(`http://localhost:3000/cart/${email}`)
        .then(response => response.json())
        .then(data => {
            console.log("Cart Data:", data);

            wishlistContainer.innerHTML = "";
            let totalBill = 0; // Initialize total bill

            if (data.cartItems && data.cartItems.length > 0) {
                data.cartItems.forEach((details, index) => {
                    const boxItem = document.createElement('div');
                    boxItem.className = "box";

                    // Shoe Image
                    const photoItem = document.createElement('div');
                    photoItem.className = "photo";
                    photoItem.style.width = "15em";
                    photoItem.style.height = "15em";
                    photoItem.style.backgroundImage = `url('images/${details.image_path}')`;
                    photoItem.style.backgroundSize = "cover";

                    // Item Details
                    const itemElement = document.createElement('div');
                    itemElement.className = 'information';
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
                            <select class="quantity-selector" data-price="${details.price}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </p>
                    `;

                    boxItem.appendChild(photoItem);
                    boxItem.appendChild(itemElement);
                    wishlistContainer.appendChild(boxItem);
                    totalBill += details.price; 
                });

                // Create Total Bill Section
                bill1.innerHTML = "";
                const totalBillElement = document.createElement('div');
                totalBillElement.innerHTML = `
                    <p style="font-size:20px">Here is the Total Bill For Your Orders!!</p><br>
                    <h2 id="total-bill">Your Grand Total is: $${totalBill}</h2>
                `;
                bill1.appendChild(totalBillElement);

                // Add event listener to quantity dropdowns
                document.querySelectorAll(".quantity-selector").forEach(select => {
                    select.addEventListener("change", updateTotalBill);
                });
                totalBill.innerHTML = `${data.totalBill}`;

                function updateTotalBill() {
                    totalBill = 0;// Reset total bill
                    document.querySelectorAll(".quantity-selector").forEach(select => {
                        const quantity = parseInt(select.value);
                        const price = parseFloat(select.getAttribute("data-price"));
                        totalBill += quantity * price;
                    });

                    // Update displayed total bill
                    document.getElementById("total-bill").innerText = `Your Grand Total is: $${totalBill}`;
                }   const bolt = document.createElement("button");
                                bolt.className="button-43";
                                bolt.innerText="Confirm Order";
                                bolt.onclick= function(){
                                    window.location.href="thankyou.html";
                                    wishlistContainer.innerHTML="";
                                    
                
                                }
                                bill1.appendChild(totalBillElement);
                                bill1.appendChild(bolt)
            } else {
                wishlistContainer.innerHTML = '<p>No items found in your cart.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
            wishlistContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

// Load items when the page is ready
document.addEventListener('DOMContentLoaded', fetchCartItem);

