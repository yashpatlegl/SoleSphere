// const { log } = require("console");
// const { emit } = require("process");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let feedback = "";

document.getElementById("speech").addEventListener("click", function (e) {
  console.log("star");
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    feedback += `${transcript}`;
    const texta = document.getElementById("feedback-input");
    let previous = texta.innerHTML;
    texta.innerHTML = previous + `  ${transcript}`;
  };
});

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
    ii.style.color = "black";
  }
});

const micButton = document.getElementById("speech");

// Function to simulate mic activation
function toggleMic() {
  micButton.classList.toggle("mic-active");

  // Simulate mic activity duration (for example, 5 seconds)
  setTimeout(() => {
    micButton.classList.remove("mic-active");
  }, 5000);
}

micButton.addEventListener("click", toggleMic);



document.getElementById("submit-button").addEventListener("click", function(event) {
    event.preventDefault(); // Prevents default form submission

    // Collect form data
    let email = sessionStorage.getItem("email");
    let review=document.getElementById("feedback-input").value;
    console.log(email,review);
    

    // let review = document.getElementById("feedback-input").value;

    // Send review data to the server
    fetch("http://localhost:3000/add-review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, review })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show response message
    })
    .catch(error => console.error("Error submitting review:", error));
});



document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.classList.add("background-elements");
    document.body.appendChild(container);
  
    for (let i = 0; i < 17; i++) {
      let shape = document.createElement("div");
      shape.classList.add("shape");
      shape.style.left = `${Math.random() * 100}vw`;
      shape.style.top = `${Math.random() * 100}vh`;
      shape.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(shape);
    }
  });

 
  