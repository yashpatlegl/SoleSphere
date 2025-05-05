
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


const registerBtn1 = document.getElementById('registerf');
const loginBtn1 = document.getElementById('loginf');


registerBtn1.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn1.addEventListener('click', () => {
    container.classList.remove("active");
});




let accounts = [];
fetch('/backend/accounts.json')
    .then(response => response.json())
    .then(data => {
        accounts = data;
        // console.log('Accounts loaded:', accounts); // For debugging
    });

registerBtn.addEventListener('click', () => {
        const name = document.querySelector('.sign-up input[type="text"]').value;
        const email = document.querySelector('.sign-up input[type="email"]').value;
        const password = document.querySelector('.sign-up input[type="password"]').value;
        console.log(name,email,password);
    
        if (name && email && password) {
            // console.log(JSON.stringify({ username: name, email, password }));
            const response = fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: name, email:email, password:password }),
                // ...
              })    
            .then(response => {
                if (response.ok) {
                    alert('Registration successful! Please sign in.');
                    container.classList.add("active");
                } else if (response.status === 409) {
                    alert('Email is already registered.');
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again later.');
            });
        } else {
            alert('All fields are required for registration.');
        }
    });


loginBtn.addEventListener('click', () => {


    const email = document.querySelector('.sign-in input[type="email"]').value;
    const password = document.querySelector('.sign-in input[type="password"]').value;

    const user = accounts.find(account => account.email === email && account.password === password);

    if (user) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("userLoggedIn", "true");
        updateNavbar();
        console.log(`Login successful: Welcome, ${user.username}!`);
        event.preventDefault();
        
        window.location.href = "index.html";

       
    } else {
        console.log('Invalid email or password.');
        alert('Invalid email or password. Please try again.');
    }

    container.classList.remove("active"); 
});




function updateNavbar() {
    let iconDiv = document.querySelector(".icon");
    
    
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      
      let wishlink = document.createElement("a");
      wishlink.href = "wishlist.html";

      let wishlistIcon = document.createElement("i");
      wishlistIcon.className = "fa fa-heart";
      wishlistIcon.style.fontSize = "24px";
      wishlink.appendChild(wishlistIcon);
  
    
      let bagIcon = document.createElement("a");
      bagIcon.href="cart.html";

      let shoppingBagIcon = document.createElement("i");
      shoppingBagIcon.className = "fa fa-shopping-bag";
      shoppingBagIcon.style.fontSize = "24px";
      bagIcon.appendChild(shoppingBagIcon)
  
      
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
  
      
      iconDiv.appendChild(wishlink);
      iconDiv.appendChild(bagIcon);
      iconDiv.appendChild(logoutButton);
  
      
      logoutButton.addEventListener("click", function() {
        
        if (wishlink && bagIcon) {
          iconDiv.removeChild(wishlink);
          iconDiv.removeChild(bagIcon);
          iconDiv.removeChild(logoutButton);
          sessionStorage.clear();
        }
      });
    }
  }
  

  




