document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Convert object to JSON
    const formJson = JSON.stringify(formObject);

    // Send form data to the API
    fetch('https://yourapi.example.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formJson
    })
    .then(response => response.json())
    .then(data => {
        // Handle success response
        document.getElementById('responseMessage').textContent = 'Form submitted successfully!';
    })
    .catch(error => {
        // Handle error response
        document.getElementById('responseMessage').textContent = 'An error occurred while submitting the form.';
        console.error('Error:', error);
    });
});



import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://formspree.io/your-form-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          alert('Message sent successfully!');
        } else {
          alert('Error sending message');
        }
      })
      .catch(error => {
        alert('Error sending message');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="mobileNo" value={formData.name} onChange={handleChange} placeholder="Mobile no." required />
      <input type="text" name="feedback" value={formData.message} onChange={handleChange} placeholder="Feedback" required/>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;