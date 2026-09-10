(function () {
    'use strict';

    const form = document.getElementById('email-form');
    if (!form || typeof emailjs === 'undefined') return;

    emailjs.init("93J-n_5roAAJwRTLp");

    const nameInput = document.getElementById('from-name');
    const emailInput = document.getElementById('from-email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const label = submitBtn.querySelector('.btn__label');
    const status = document.getElementById('form-status');

    function setStatus(text, type) {
        status.textContent = text;
        status.className = 'form-status' + (type ? ' is-' + type : '');
    }

    function validate() {
        let valid = true;
        [nameInput, emailInput, messageInput].forEach(input => {
            const ok = input.checkValidity() && input.value.trim() !== '';
            input.classList.toggle('is-invalid', !ok);
            if (!ok) valid = false;
        });
        return valid;
    }

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => input.classList.remove('is-invalid'));
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validate()) {
            setStatus('Please fill in all fields with a valid email address.', 'error');
            return;
        }

        submitBtn.disabled = true;
        label.textContent = 'Sending...';
        setStatus('', '');

        emailjs.send("service_6uf4wup", "template_z1j7erj", {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim()
        }).then(function () {
            setStatus("Thanks! Your message has been sent. I'll get back to you soon.", 'success');
            form.reset();
        }, function (error) {
            console.error('Email send failed:', error);
            setStatus('Something went wrong. Please try again or reach me on LinkedIn.', 'error');
        }).finally(function () {
            submitBtn.disabled = false;
            label.textContent = 'Send message';
        });
    });
})();
