
document.addEventListener('DOMContentLoaded', (event) => {
const usernameInput = document.getElementById('loginUsername');
const passwordInput = document.getElementById('loginPassword');
const loginError = document.getElementById('loginWarning');
const loginButton = document.getElementById('loginButton');
const loginHome = document.getElementById('loginOrRegister');

const removeButton = () => {
    loginHome.remove();
};

// Function to send registration data to the server
const sendLoginData = (username, password) => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => {
        if (res.status === 404) {
            return loginError.textContent = 'User not found';
        }  
        if (res.status === 401) {
            return loginError.textContent = 'Invalid username or password';
        }
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error:', error);
        return;
    });
};

const login = (event) => {
    event.preventDefault();
    loginError.textContent = '';
    const username = usernameInput.value;
    const password = passwordInput.value

    if (!username || !password) {
        loginError.textContent = 'Please fill in all fields.';
        return;
    }

    sendLoginData(username, password);
};

// Event listener for remove button click
removeButton();

// Event listener for login button click
loginButton.addEventListener('click', login);
});
