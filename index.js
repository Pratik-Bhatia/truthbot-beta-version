
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


