// Select all the sections
const sections = document.querySelectorAll("section");

// Create an IntersectionObserver to observe sections entering/exiting the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add visible class when in the viewport
        } else {
            entry.target.classList.remove("visible"); // Remove visible class when leaving
        }
    });
}, {
    threshold: 0.2
}); // Trigger when 20% of the section is visible

// Start observing each section
sections.forEach((section) => observer.observe(section));




document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    emailjs.sendForm('service_tzvojgp', 'template_qr1ot4j', this)
      .then(function(response) {
        alert('Message sent successfully!');
      }, function(error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      });
  });