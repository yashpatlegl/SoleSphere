// function fetchCartItem(){
//     const email = sessionStorage.getItem('email');
//     const wishlistContainer = document.getElementById('collectionbox');
//     if (!wishlistContainer) {
//         console.error('Cart container not found in the DOM.');
//         return;
//     }

//     if (!email) {
//         alert('Please enter a valid email!');
//         return;
//     }


//     fetch(`http://localhost:3000/cart/${email}`)
//     .then(response=> response.json())
//     .then(data=>{
//         console.log(data);

//         if(data && Object.keys(data).length >0){
//             Object.entries(data).forEach(([item, details])=>
//             {
//                 const boxitem = document.createElement('div');
//                 const photoitem = document.createElement('div');
//                 photoitem.className="photo";
//                     photoitem.style.width ="15rem";
//                     photoitem.style.height ="15rem";
//                     photoitem.style.backgroundImage = `url('images/${details.image_path}')`;
//                     photoitem.style.backgroundSize="cover";

//                     itemElement.className = 'information';
//                     itemElement.innerHTML = `
//                         <p style="font-size:1.5rem"><strong>${details.model}</strong></p>
//                         <p style="font-size:1.5rem"><strong>Price: $${details.price}<strong></p><div style="object-fit: cover; heigth: 2rem" >
//                         <button style="align-self: flex-end;" class="button-43">ADD TO CART</button>
//                     `; 
//                     boxiteam.appendChild(photoitem);
//                     boxiteam.appendChild(itemElement);  
//                     wishlistContainer.appendChild(boxiteam); 

//             });
//         }
//         else{
//             wishlistContainer.innerHTML = '<p>No wishlist found for this email.</p>';
//         }
        
//     })
//     .catch(error => {
//         console.error('Error fetching wishlist:', error);
//         wishlistContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
//     });



// }
// document.addEventListener('DOMContentLoaded', fetchCartItem);



function fetchCartItem() {
    const email = sessionStorage.getItem('email');
    const wishlistContainer = document.getElementById('collectionbox');
    const cart_count = document.getElementById('cartCount')

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
        cart_count.innerHTML=`${Object.keys(data).length}`;

        if (data && Object.keys(data).length > 0) {
            Object.entries(data).forEach(([item, details]) =>{
                wishlistContainer.innerHTML = "";
                data.cartItems.forEach(details => {
                    const boxItem = document.createElement('div');
                    boxItem.className = "box";
    
                    const photoItem = document.createElement('div');
                    photoItem.className = "photo";
                    photoItem.style.width = "15em";
                    photoItem.style.height = "15em";
                    photoItem.style.backgroundImage = `url('images/${details.image_path}')`;
                    photoItem.style.backgroundSize = "cover";
    
                    const itemElement = document.createElement('div');
                    itemElement.className = 'information';
                    itemElement.innerHTML = `
                        <p style="font-size:1rem"><strong>${details.model}</strong></p>
                        <p style="font-size:1rem"><strong>Price: $${details.price}</strong></p>
                    `;
    
                    // ADD TO CART BUTTON
    
                    // itemElement.appendChild(addButton);
                    boxItem.appendChild(photoItem);
                    boxItem.appendChild(itemElement);
                    wishlistContainer.appendChild(boxItem);
                });
    
                // Display total bill at the bottom
                const bill1 = document.getElementById("bill");
                bill1.innerHTML = "";
                const totalBillElement = document.createElement('div');
                totalBillElement.innerHTML = `<p style="font-size:20px ">Here is the Total Bill For Your Orders!!</p><br>
                <h2>Total Bill: $${data.totalBill}</h2>`;
                const bolt = document.createElement("button");
                bolt.className="button-43";
                bolt.innerText="Confirm Order";
                bolt.onclick= function(){
                    window.location.href="thankyou.html";
                    wishlistContainer.innerHTML="";

                }
                bill1.appendChild(totalBillElement);
                bill1.appendChild(bolt)

            }
            );

            
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

