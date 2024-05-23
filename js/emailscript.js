
emailjs.init("93J-n_5roAAJwRTLp"); // Replace with your EmailJS user ID

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the user inputs
    const from = document.getElementById('from-name').value;
    const email = document.getElementById('from-email').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send("service_6uf4wup", "template_z1j7erj", {
        from_name: from,
        from_email: email,
        message: message,
        message: message 
    }).then(function(response) {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully!');
        console.log(message);
    }, function(error) {
        console.error('Email send failed:', error);
        alert('Email send failed. Please try again later.');
    });
});

