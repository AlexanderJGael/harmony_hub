const emailInput = document.getElementById('email');
const confirmEmailInput = document.getElementById('confirmEmail');
const usernameInput = document.getElementById('username');
const confirmUsernameInput = document.getElementById('confirmUsername');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const registerButton = document.getElementById('registerButton');
const errorMessage = document.getElementById('errorMessage');

// Function to check if two input values match
function doInputsMatch(input1, input2) {
    return input1.value === input2.value;
}

// Function to send registration data to the server
function sendRegistrationData(email, username, password) {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
    .then(res => {
        if (res.status === 400) {
            errorMessage.textContent = 'Invalid email';
            return;
        }
        if (res.status === 409) {
            errorMessage.textContent = 'User already exists';
            return;
        } else {
            window.location.replace('/');
        };
    })
    .catch(error => {
        console.error('Error:', error);
        return;
    });
};

// Function to handle registration process
function register(event) {
    event.preventDefault();
    errorMessage.textContent = '';

    // Checks to see if fields are filled and if they match each other.
    if (!emailInput.value || !confirmEmailInput.value || !usernameInput.value || !confirmUsernameInput.value || !passwordInput.value || !confirmPasswordInput.value) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    if (!doInputsMatch(emailInput, confirmEmailInput)) {
        errorMessage.textContent = 'Emails do not match.';
        return;
    }
    if (!doInputsMatch(usernameInput, confirmUsernameInput)) {
        errorMessage.textContent = 'Usernames do not match.';
        return;
    }
    if (!doInputsMatch(passwordInput, confirmPasswordInput)) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Send registration data to the server
    sendRegistrationData(email, username, password);
};

// Event listener for register button click
registerButton.addEventListener('click', register);