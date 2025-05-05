const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                let feedback= '';

                document.getElementById('speech').addEventListener('click',function(e){
                    console.log('star')
                recognition.start();  
                recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log(transcript)
                feedback+=`${transcript}` ;
                const texta = document.getElementById("feedback-input");
                let previous = texta.innerHTML;
                texta.innerHTML= previous+`  ${transcript}`;
            
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
                    ii.style.color="black";
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
              
