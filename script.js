// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Particle background animation
function createParticles() {
  const particles = document.querySelector(".particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random initial position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `float ${duration}s linear infinite`;

    particles.appendChild(particle);
  }
}

// Add floating animation
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(100px, 100px) rotate(90deg);
        }
        50% {
            transform: translate(0, 200px) rotate(180deg);
        }
        75% {
            transform: translate(-100px, 100px) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  type(); // Start typewriter effect
});

// smooth scrolling code
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });
  });
});

//  typewriter effect code
const text = "DevOps & Full Stack Development";
let index = 0;
const typewriter = document.querySelector(".typewriter");
typewriter.textContent = "";

function type() {
  if (index < text.length) {
    typewriter.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}


const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll("section:not(#home)").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(section);
});


// Contact Form Handling
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const form_data = new FormData(form);
  const submitBtn = form.querySelector(".submit-btn");
  const originalBtnText = submitBtn.innerHTML;
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbw5YIxm5zhz27aXnE-vOREt-NsPgylF3a5cp8OLvkHPptDvWdI9OYt0WuPbDHyNsC-L/exec";
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  fetch(scriptURL, { method: "POST", body: form_data })
    .then((response) => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
      submitBtn.style.background = "#28a745";

      // Reset form
      form.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.background = "";
      }, 3000);
    })
    .catch((error) => {
      alert("Error!", error.message);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });

  return false;
}
