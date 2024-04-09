const emailInput = document.getElementById('email');
const confirmEmailInput = document.getElementById('confirmEmail');
const usernameInput = document.getElementById('username');
const confirmUsernameInput = document.getElementById('confirmUsername');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const registerButton = document.getElementById('registerButton');
const errorMessage = document.getElementById('errorMessage');
const registerHome = document.getElementById('loginOrRegister');

// Function to remove the login button
function removeButton() {
    registerHome.remove();
};

// Function to check if two input values match
function doInputsMatch(input1, input2) {
    return input1.value === input2.value;
}

const userDatabasePOST = async (email, username, password) => {
    try {
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const createApiUser = async (email, username, password) => {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        throw e;
    };

    userDatabasePOST(email, username, password);
};

// Function to send registration data to the server
function sendRegistrationData(email, username, password) {
    fetch('/api/register', {
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
        }

        createApiUser(email, username, password);
        window.location.href = '/';
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
    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

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

    // Send registration data to the server
    sendRegistrationData(email, username, password);
};

removeButton();

// Event listener for register button click
registerButton.addEventListener('click', register);