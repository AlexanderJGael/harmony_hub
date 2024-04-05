document.addEventListener('DOMContentLoaded', function() {
// Function to handle login button click
function handleLoginClick(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the server to authenticate the user
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    },
    console.log(username)
    )
    .then(response => {
        if (response.ok) {
            document.location.assign("/")
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
});

// Event listener for login button click
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', handleLoginClick);
