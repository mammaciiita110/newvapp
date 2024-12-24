document.getElementById('login-button').addEventListener('click', function() {
    const userNumber = document.getElementById('user-number-input').value;
    fetch(`/.netlify/functions/getUserData?number=${userNumber}`)
        .then(response => response.json())
        .then(data => {
            // Check if the data contains the user details
            if (data && !data.msg) {
                // Save user data in localStorage or pass it to the main script
                localStorage.setItem('userData', JSON.stringify(data));
                window.location.href = 'index.html'; // Redirect to the main page
            } else {
                // Handle case where user data is not found or an error message is returned
                alert("Fel kod!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while trying to fetch user data.");
        });
});

