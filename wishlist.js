function fetchWishlist() {
    const email = sessionStorage.getItem('email');
    const wishlistContainer = document.getElementById('wishlist');

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
            wishlistContainer.innerHTML = ''; // Clear previous data

            if (data && Object.keys(data).length > 0) {
                Object.entries(data).forEach(([item, details]) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'wishlist-item';
                    itemElement.innerHTML = `
                        <p><strong>${details.model}</strong></p>
                        <p>Price: $${details.price}</p>
                        <img src="images/${details.image_path}" alt="${details.model}" style="max-width: 200px;">
                        <button onclick="addToCart('${details.model}', '${details.price}')">ADD TO CART</button>
                    `;
                    wishlistContainer.appendChild(itemElement);
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
