// Get elements
const usernameElement = document.querySelector('.username');
const selectPhotoBtn = document.getElementById('selectPhotoBtn');
const aboutMeTextarea = document.getElementById('about-me');
const saveBtn = document.getElementById('save-btn');

// Event listener for photo button
photoBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = [
                'image/jpeg', 
                'image/png', 
                'image/gif',
                'image/jpg',
            ];
            if (!validImageTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF).');
                return;
            }
            uploadPhoto(file);
        }
    });
    fileInput.click();
});

// Event listener for save button
saveBtn.addEventListener('click', () => {
    const username = usernameElement.textContent;
    const aboutMe = aboutMeTextarea.value;

    fetch('/api/profiles', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ aboutMe })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save biography');
        }
        console.log('Biography saved successfully');
        window.location.href = '/homepage.handlebars';
    })
    .catch(error => {
        console.error('Error saving biography:', error);
    });
});

function uploadPhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);
    fetch('/api/user/uploadPhoto', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload photo');
        }
        return response.json();
    })
    .then(data => {
        console.log('Photo uploaded successfully:', data.photoUrl);
    })
    .catch(error => {
        console.error('Error uploading photo:', error.message);
    });    
    console.log('photo:', file.name);
}