function fetchWishlist() {
    const email = sessionStorage.getItem('email');
    const wishlistContainer = document.getElementById('collectionbox');

    if (!wishlistContainer) {
        console.error('Wishlist container not found in the DOM.');
        return;
    }

    if (!email) {
        alert('Please enter a valid email!');
        return;
    }

    fetch(`http://localhost:3000/wishlist/${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // wishlistContainer.innerHTML = '';   // Clear previous data
            // wishlistContainer.style.display="grid";
            // wishlistContainer.style.gridTemplateRows="repeat(2,1fr)";
            // wishlistContainer.style.gap="1rem"
            // wishlistContainer.style.gridTemplateColumns="repeat(4,1fr)"

            if (data && Object.keys(data).length > 0) {
                Object.entries(data).forEach(([item, details]) => {
                    const boxiteam=document.createElement('div');
                    boxiteam.className="box";
                    // boxiteam.style.display="flex";
                    const itemElement = document.createElement('div');
                    const photoitem =document.createElement('div');
                    photoitem.className="photo";
                    photoitem.style.width ="15rem";
                    photoitem.style.height ="15rem";
                    photoitem.style.backgroundImage = `url('images/${details.image_path}')`;
                    photoitem.style.backgroundSize="cover";
                  
                    itemElement.className = 'information';
                    itemElement.innerHTML = `
                        <p style="font-size:1.5rem"><strong>${details.model}</strong></p>
                        <p style="font-size:1.5rem"><strong>Price: $${details.price}<strong></p><div style="object-fit: cover; heigth: 2rem" >
                        <button style="align-self: flex-end;" class="button-43">ADD TO CART</button>
                    `;
                    boxiteam.appendChild(photoitem);
                    boxiteam.appendChild(itemElement);

                
                    wishlistContainer.appendChild(boxiteam);
                });
            } else {
                wishlistContainer.innerHTML = '<p>No wishlist found for this email.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching wishlist:', error);
            wishlistContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

// Example function to handle adding to cart
function addToCart(model, price) {
    console.log(`Adding ${model} ($${price}) to cart...`);
    alert(`${model} added to cart!`);
}

// Call fetchWishlist on page load
document.addEventListener('DOMContentLoaded', fetchWishlist);






// <img  src="images/${details.image_path}" alt="${details.model}" style="max-width: 200px;"></div>
// <button onclick="addToCart('${details.model}', '${details.price}')">ADD TO CART</button>