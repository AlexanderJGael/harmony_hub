document.addEventListener('DOMContentLoaded', function() {
// Function to handle login button click
function handleLoginClick() {
    const usernameOrEmail = document.getElementById('username-email').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the server to authenticate the user
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameOrEmail, password: password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/homepage';
        } else if (response.status === 404) {
            document.getElementById('login-warning').innerText = 'User does not exist. Please register your account.';
        } else if (response.status === 401) {
            document.getElementById('login-warning').innerText = 'Incorrect password. Please try again.';
        } else {
            document.getElementById('login-warning').innerText = 'An error occurred. Please try again later.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-warning').innerText = 'Network error. Please check your connection.';
    });
}

// Function to handle registration button click
function handleRegisterClick() {
    window.location.href = '/register';
}

// Event listener for login button click
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', handleLoginClick);

// Event listener for registration button click
const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', handleRegisterClick);
});