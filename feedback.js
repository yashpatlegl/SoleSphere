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