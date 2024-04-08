document.addEventListener('DOMContentLoaded', function() {

const errorMessage = document.getElementById('login-warning');

// Function to handle login button click
function handleLoginClick(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the server to authenticate the user
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    },
    )
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to login');
        }

        // Redirect to the homepage if login is successful
        window.location.replace('/');
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = error.message;
    });
}
});

// Event listener for login button click
const loginButton = document.getElementById('login-button');
if (loginButton){
    loginButton.addEventListener('click', handleLoginClick);
};
