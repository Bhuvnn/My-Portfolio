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