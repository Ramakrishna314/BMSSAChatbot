document.addEventListener('DOMContentLoaded', function() {
    var chatBox = document.getElementById('chatMessages');
    var userInput = document.getElementById('userMessage');
   
    var messengerIcon = document.querySelector('.messenger-icon'); 
    var chatboxContainer = document.querySelector('.chatbox-container');
    var closeButton = document.querySelector('.close-button');
    var refreshButton = document.querySelector('.refresh-button');
    closeButton.addEventListener('click', closeChatbox);
    function closeChatbox() {
        chatBox.innerHTML = '';
        chatboxContainer.style.display = 'none';
    }
    refreshButton.addEventListener('click', function() {
        chatBox.innerHTML = ''; // Clear chat history
        sendGreetingMessage();
    });
     // Add click event listener to the messengerIcon
     messengerIcon.addEventListener('click', function() {
        
        // Toggle visibility of the chatbox container
        if (chatboxContainer.style.display === 'none' || !chatboxContainer.style.display) {
            chatboxContainer.style.display = 'block';
            
            
            sendGreetingMessage();
        } else {
            chatboxContainer.style.display = 'none';
        }
       
    
    });

   

    function sendMessage() {
        var message = userInput.value.trim();
        if (message === '') return;

        console.log("User Input:", message);
    
    
        displayUserMessage(message);
    
        // Send user input to the server for processing
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            // Check if response is empty
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data); // Debugging statement
            if (data && data.response) {
                displayBotMessage(data.response);
                // Generate options
                if (data.intent === 'greeting') {
                    setTimeout(function() {
                        displayOptions();
                    }, 500);
                }
            } else {
                console.error('Invalid response from server:', data); // Debugging statement
            }
        });
    
        userInput.value = '';
    }
    function sendGreetingMessage() {
        chatBox.innerHTML = ''; // Clear chat history
        var greetingContainer = document.createElement('div');
        greetingContainer.classList.add('greeting-container');

        var botImage = document.createElement('img');
        botImage.src = 'static/assets/BMSSAImage.png'; // Update with actual path to your bot image
        botImage.classList.add('centered-image');

        var greetingText = document.createElement('p');
        greetingText.innerHTML = "BMSSA ChatBot<br>Our virtual assistant is here to help you.";
        greetingText.classList.add('greeting-text');

        greetingContainer.appendChild(botImage);
        greetingContainer.appendChild(greetingText);
        chatBox.appendChild(greetingContainer);

        setTimeout(function() {
            displayBotMessageWithoutImage("Hi! Welcome to BMS School of Architecture.");
            setTimeout(function() {
                displayBotMessageWithoutImage("BMS School of Architecture, the 8th institution under the BMS Educational Trust, has the distinction of being established as an Independent “School of Architecture” in the year 2010. BMSSA is a center of innovation and one of the nation’s few independent architecture schools with a stated mission of being dedicated to educating future generations to be ethical professionals, creative designers and informed citizens.");
                setTimeout(function() {
                    displayBotMessage("What Information are you looking for?");
                    displayInitialOptions();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    function displayInitialOptions() {
        displayOption('Academics');
        displayOption('Admissions');
        displayOption('More Information about our college');
        displayOption('Placements');
        displayOption('End conversation');
    }
    function displayAcademicsOptions() {
        // Display message about the programs offered
        displayBotMessage('Our BMSSA offers 3 programmes:');
        // Display options for B.Arch, M.Arch, and Ph.D
        displayOption('B.Arch');
        displayOption('M.Arch');
        displayOption('Ph.D');
    }
    function displayFollowUpOptions() {
        displayBotMessage("What other information would you like to know?");
        displayOption('Contact Us');
        displayOption('Main Menu');
        displayOption('End Conversation');
    }
    
   
  
    function displayMessage(message, color, isBotMessage = true ) {
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = color;
        if (isBotMessage) {
            messageElement.classList.add('bot-message'); // Add bot message class
        } else {
            messageElement.classList.add('user-message'); // Add user message class
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayUserMessage(message) {
        // Create a container for the user message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('user-message-container');
    
        // Create the user image element
        var userImage = document.createElement('img');
        userImage.src = 'static/assets/user-image.png'; // Replace 'path_to_your_user_image.jpg' with the actual path to your user image
        userImage.classList.add('user-image');
    
        // Create the user message element
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        messageElement.style.color = 'white';
    
        // Append the user image and message to the container
        messageContainer.appendChild(userImage);
        messageContainer.appendChild(messageElement);
    
        // Display time at the bottom of the user message box
        var timeElement = document.createElement('span');
        timeElement.classList.add('time');
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        timeElement.textContent = currentTime;
    
        messageContainer.appendChild(timeElement);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
    
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function displayBotMessage(message) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
    
        // Create the bot image element
        var botImage = document.createElement('img');
        botImage.src = '/static/assets/bot-image.png'; // Replace 'path_to_your_bot_image.png' with the actual path to your bot image
        botImage.classList.add('bot-image');
    
        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'black';
    
        var whiteLinks = messageElement.querySelectorAll('a');
        whiteLinks.forEach(function(link) {
            link.style.color = 'white';
        });
    
        var timeContainer = document.createElement('div');
        timeContainer.classList.add('time-container');
    
        var timeElement = document.createElement('span');
        timeElement.classList.add('time');
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        timeElement.textContent = currentTime;
    
        timeContainer.appendChild(timeElement);
    
        // Append the bot image, message, and time container to the message container
        messageContainer.appendChild(botImage);
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(timeContainer);
    
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    

    function displayBotMessageWithoutImage(message, color) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
        messageContainer.style.paddingLeft = '30px';

        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'black';
        


        var whiteLinks = messageElement.querySelectorAll('a');
        whiteLinks.forEach(function(link) {
            link.style.color = 'blue';
        });

        messageContainer.appendChild(messageElement);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

   
    
    function displayFeedbackMessage() {
        // Create feedback options container
        var feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedback-container');
    
        // Create feedback message
        var feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = "Was I able to answer your question?";
        feedbackContainer.appendChild(feedbackMessage);
    
        // Create like button
        var likeButton = document.createElement('button');
        likeButton.textContent = "👍";
        likeButton.classList.add('feedback-button');
        likeButton.addEventListener('click', function() {
            displayUserMessage('👍');
            setTimeout(function() {
                fetchFeedbackResponse('like');
            }, 500);
        });
        feedbackContainer.appendChild(likeButton);
    
        // Create dislike button
        var dislikeButton = document.createElement('button');
        dislikeButton.textContent = "👎";
        dislikeButton.classList.add('feedback-button');
        dislikeButton.addEventListener('click', function() {
            displayUserMessage('👎');
            setTimeout(function() {
                fetchFeedbackResponse('dislike');
            }, 500);
        });
        feedbackContainer.appendChild(dislikeButton);
    
        // Append feedback options container to the chat box
        chatBox.appendChild(feedbackContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
   
    
    function displayOption(optionText) {
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        var optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
        optionElement.style.marginBottom = '10px';
        optionElement.style.paddingLeft = '30px';
        
        
        
        optionElement.addEventListener('click', function() {
            // Display user message
            displayUserMessage(optionText);
            // Fetch bot response
           setTimeout(function() {
            fetchBotResponse(optionText);
           },500);
        });
    
    
        optionElement.addEventListener('mouseover', function() {
            optionElement.style.backgroundColor = 'crimson';
            optionElement.style.color = 'white';
        });
    
        optionElement.addEventListener('mouseout', function() {
            optionElement.style.backgroundColor = 'white';
            optionElement.style.color = 'crimson';
        });
    
        optionContainer.appendChild(optionElement);
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function fetchBotResponse(optionText) {
        if (optionText.toLowerCase() === 'academics') {
            displayAcademicsOptions()
           
            return; // Exit the function

        }
        if (optionText.toLowerCase() === 'b.arch') {
           
            displayBotMessageWithoutImage('BMSSA offers 5 year B.Arch Programme approved by Council of Architecture, (CoA), Govt. of Karnataka and is affiliated to Visvesvaraya Technological University, Belgaum. The Bachelor of Architecture professional degree program, aims at enabling students to develop an analytical and sensitive approach towards design to make them responsible future generation architects.');
            displayBotMessageWithoutImage('To know more: <a href="https://www.bmssa.ac.in/b_arch.php" target="_blank">Click here</a>');
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'm.arch') {
           
            displayBotMessageWithoutImage('BMSSA offers 2 year Masters of Architecture Programme approved by Council of Architecture, (CoA), Govt. of Karnataka and is affiliated to Visvesvaraya Technological University, Belgaum. The M.Arch program awards the students a professional in Urban Design, combining rigorous training of the skills and disciplines with critical and advanced outlook on social and environmental awareness.');
            displayBotMessageWithoutImage('To know more: <a href="https://www.bmssa.ac.in/m_arch.php" target="_blank">Click here</a>');
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'ph.d') {
           
            displayBotMessageWithoutImage('Ph.D (THE CENTRE for INNOVATION and DESIGN MANAGEMENT VTU RESEARCH CENTRE) The Centre for Innovation and Design Management, the R & D wing of BMS School of Architecture is now a recognized VTU “Research Centre”. Presently, we have a group of committed Ph.D research scholars who are investigating topics ranging from participatory planning, energy efficiency in architecture to application of hydrology in Urban systems. The scholars are encouraged to attend relevant workshops that can help them in developing efficient solutions for the schemes. They are also inspired to hold discussions with guides and other professionals of their choice to help them progress in their proposals.');
            displayBotMessageWithoutImage('To know more: <a href="https://www.bmssa.ac.in/ph_d.php" target="_blank">Click here</a>');
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'admissions') {
            displayBotMessageWithoutImage('BMS Educational Trust invites applications from prospective candidates for Management Quota Seats for BMS School of Architecture, Yelahanka, Bangalore - 560064');
            displayBotMessageWithoutImage('To Submit Your Admission Inquiry Query <a href="https://docs.google.com/forms/d/e/1FAIpQLSdKv6OwnBh4sKXBV_h3SbyPZxdWpVE3PAgNhQy9HOZKTQ1tJA/viewform" target="_blank">CLICK HERE</a>');
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'more information about our college') {
            displayBotMessageWithoutImage('BMS School of Architecture, the 8th institution under the BMS Educational Trust, has the distinction of being established as an Independent “School of Architecture” in the year 2010. BMSSA is a center of innovation and one of the nation’s few independent architecture schools with a stated mission of being dedicated to educating future generations to be ethical professionals, creative designers and informed citizens.');
            displayBotMessageWithoutImage('To know more: <a href="https://www.bmssa.ac.in/institution.php" target="_blank">Click here</a>');
            displayFollowUpOptions();
            
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'placements') {
            displayBotMessageWithoutImage("The Training & Placement (T&P) Cell of BMS School of Architecture is the chief facilitator for the students to obtain placements best suited to them and primarily liaisons between Industry and the Institute. The goal of Training & Placement Cell is to provide world class training to BMS School of Architecture students. The Training & Placement Cell is dedicated to motivate and help the student community towards their placement and industrial training. This is done by training students from the first year onwards focusing on motivational skills, communication skills, interpersonal relationships, leadership qualities, group discussions and portfolio making techniques. Additionally, the Cell also provides the required infra-structural facilities to conduct group discussions besides catering to other logistics.");
            displayBotMessageWithoutImage("EMAIL: <a href='mailto:placements@bmssa.ac.in' style='color:blue;'>placements@bmssa.ac.in</a>");
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'end conversation') {
            displayBotMessage('Goodbye! Have a nice day.', false);
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'contact us') {
            displayBotMessageWithoutImage('To contact us: <a href="https://www.bmssa.ac.in/contact.php" target="_blank">Click here</a>');
            displayFollowUpOptions();
            return; // Exit the function
        }
        if (optionText.toLowerCase() === 'main menu') {
            displayInitialOptions()
        }
       
    
    }
   
    
    function fetchFeedbackResponse(feedback) {
        if (feedback === 'like') {
            displayBotMessage('Thanks for your feedback. Is there anything else that I can help you with?', false);
            displayOptionsAfterFeedback();
        } else if (feedback === 'dislike') {
            displayBotMessage('I\'m sorry to hear that. Try again!.', false);
            setTimeout(function() {
                sendGreetingMessage();
            }, 500);
        }
    }
    function displayOptionsAfterFeedback() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'crimson';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            setTimeout(function() {
                displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
            }, 500);
        });
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'crimson';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayOptionsAfterExaminationOptions() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            // Call the function to send the greeting message and display options
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'crimson';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            // Display farewell message
            displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
        });
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'crimson';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
   
 
});