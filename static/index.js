// Load navbar.html into the placeholder
fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch(error => console.error("Error loading navbar:", error));





const toggleSwitch = document.getElementById('themeToggle');
const body = document.body;

toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.replace('light-mode', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
    }
});

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('summarize-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        const text = document.getElementById('text').value; // Get the value from the textarea
        const loadingBar = document.querySelector('.loading-bar');
        const progress = loadingBar.querySelector('.loading-bar-progress');

        // Show loading bar
        loadingBar.style.display = 'block';
        progress.style.width = '0%';

        // Use fetch to send data to the Flask backend
        fetch('/summarization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            const summaryText = document.getElementById('summary-text');
            summaryText.innerHTML = ''; // Clear previous summary
            summaryText.innerHTML += `<li>${data.summary}</li>`; // Add new summary item
            progress.style.width = '100%'; // Complete loading bar
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while generating the summary. Please try again.');
        })
        .finally(() => {
            loadingBar.style.display = 'none'; // Hide loading bar
        });
    });
});
