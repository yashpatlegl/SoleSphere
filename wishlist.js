async function addToWishlist(event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const model = document.getElementById("model").value.trim();

            if (!email || !model) {
                alert("Both email and model fields are required.");
                return;
            }

            const response = await fetch("http://localhost:3000/add-to-wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, model })
            });

            const data = await response.json();
            alert(data.message);
        }