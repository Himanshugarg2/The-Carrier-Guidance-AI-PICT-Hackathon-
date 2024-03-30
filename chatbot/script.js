const text = "MentorMate";
      let i = 0;
      const typingSpeed = 80; // Adjust the speed of typing (lower value for faster typing)
      const erasingSpeed = 40; // Adjust the speed of erasing (lower value for faster erasing)

      function typeWriter() {
          const typingSpan = document.getElementById("typingText");
          const cursor = document.getElementById("cursor");
          const currentText = typingSpan.innerHTML;
          const char = text.charAt(i);

          if (i < text.length) {
              typingSpan.innerHTML += char;
              i++;
              setTimeout(typeWriter, typingSpeed);
          } 
          else 
          {
              setTimeout(eraseText, 1000); // Wait for 1 second before erasing
          }
      }

      function eraseText() {
          const typingSpan = document.getElementById("typingText");
          const cursor = document.getElementById("cursor");
          const currentText = typingSpan.innerHTML;

          if (currentText.length > 0) 
          {
              typingSpan.innerHTML = currentText.slice(0, -1); // Remove the last character
              setTimeout(eraseText, erasingSpeed);
          } 
          else 
          {
              i = 0; // Reset index for typing again
              setTimeout(typeWriter, 500); // Wait for 0.5 second before typing again            
          }
      }

      // Call the function when the page loads
      window.onload = function(){
        typeWriter();
        checkInput(); 
      };

      const chatHistory = document.getElementById("chat-history");
      const userInput = document.getElementById("user-input");
      const sendButton = document.getElementById("send-button"); 
      const form = document.getElementById("chat-form");      
      const loader = document.getElementById("loader");
      const exportButton = document.getElementById("export-button");

      function checkInput() {
        if (userInput.value.trim() === "") {
          sendButton.disabled = true;
        } else {
          sendButton.disabled = false;
        }
      }
      
      userInput.addEventListener("input", () => {
        sendButton.disabled = userInput.value.trim() === ""; // Disable button if input is empty or contains only whitespace
      });

      async function sendMessage() {
        const userMessage = userInput.value;
        userInput.value = ""; // Clear input field
        console.log(userMessage);
        try {
          const userMessageElement = document.createElement("div");
          userMessageElement.className = "user-message";
          userMessageElement.textContent = userMessage;
          userMessageElement.innerHTML = `<span class="user-message-text">${userMessage}</span>`;
          const userIcon = document.createElement("i");
          userIcon.className = document.createElement("i");
          userIcon.className = "fas fa-user user-icon";
          userMessageElement.appendChild(userIcon);
          chatHistory.appendChild(userMessageElement); 
          userMessageElement.classList.add("message-displayed");  
          
          chatHistory.scrollTop = chatHistory.scrollHeight;
          const response = await fetch("/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: userMessage }),
          });

          const data = await response.json();
          console.log(data);
          const botMessage = data.response;
          console.log(botMessage);
          loader.style.display = 'none';
          await typeBotMessage(botMessage);
          
        } catch(error) {
          console.error('Error:', error);
        }
      }

      async function typeBotMessage(message) {
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'bot-message';
        chatHistory.appendChild(botMessageElement);
        botMessageElement.classList.add('message-displayed');

        const botIcon = document.createElement('i');
        botIcon.className = 'fas fa-robot bot-icon';
        botMessageElement.appendChild(botIcon);

            

        for(let i = 0; i < message.length; i++) {
          botMessageElement.innerHTML += message.charAt(i);                     
          await sleep(10);          
        }
        
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        const loader = document.getElementById("loader");
        loader.style.display = "block"; // Show the loader
        sendMessage().finally(() => {
          loader.style.display = "none"; // Hide the loader after the message is sent
        });
      });

      exportButton.addEventListener("click", () => {
        exportChatToPDF();
      });
      
      function exportChatToPDF() {
            const doc = new jsPDF();
            const messages = document.querySelectorAll(".user-message-text, .bot-message-text");
            let yPos = 10;

            messages.forEach(message => {
                doc.text(message.textContent, 10, yPos);
                yPos += 10;
            });

            doc.save("chat_history.pdf");
        }