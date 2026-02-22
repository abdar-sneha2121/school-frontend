document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".hero-slide");
  const title = document.getElementById("heroTitle");
  const subtitle = document.getElementById("heroSubtitle");
  const nextBtn = document.querySelector(".hero-arrow.next");
  const prevBtn = document.querySelector(".hero-arrow.prev");

  let index = 0;
  let interval;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    index = (i + slides.length) % slides.length;
    slides[index].classList.add("active");

    title.style.opacity = 0;
    subtitle.style.opacity = 0;

    setTimeout(() => {
      title.textContent = slides[index].dataset.title;
      subtitle.textContent = slides[index].dataset.subtitle;
      title.style.opacity = 1;
      subtitle.style.opacity = 1;
    }, 500);
  }

  function startAutoSlide() {
    interval = setInterval(() => showSlide(index + 1), 4000);
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(index + 1);
      resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      showSlide(index - 1);
      resetAutoSlide();
    });
  }

  if (slides.length > 0) startAutoSlide();


  /* ================= COUNTER ================= */
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  function startCounters() {
    if (counterStarted) return;

    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const suffix = counter.dataset.suffix || "";
      let count = 0;

      function update() {
        count += target / 130;
        if (count >= target) {
          counter.innerText = Math.round(target) + suffix;
        } else {
          counter.innerText = Math.floor(count) + suffix;
          requestAnimationFrame(update);
        }
      }
      update();
    });

    counterStarted = true;
  }

  const achievement = document.getElementById("achievement");
  if (achievement) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) startCounters();
    }, { threshold: 0.5 }).observe(achievement);
  }


  /* ================= ABOUT SECTION ================= */
  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelector(".about-image")?.classList.add("animate");
        document.querySelector(".about-content")?.classList.add("animate");
        document.querySelector(".experience-badge")?.classList.add("animate");
      }
    }, { threshold: 0.35 }).observe(aboutSection);
  }


  /* ================= FEATURE CARDS ================= */
  const featureCards = document.querySelectorAll(".feature-card");
  function showCards() {
    const trigger = window.innerHeight * 0.85;
    featureCards.forEach(card => {
      if (card.getBoundingClientRect().top < trigger) {
        card.classList.add("show");
      }
    });
  }
  window.addEventListener("scroll", showCards);
  showCards();



  /* ================= FACILITIES ================= */
  const facilities = document.querySelectorAll(".animate-facility");
  function revealFacilities() {
    facilities.forEach((card, i) => {
      if (card.getBoundingClientRect().top < window.innerHeight - 100) {
        setTimeout(() => card.classList.add("active"), i * 150);
      }
    });
  }
  window.addEventListener("scroll", revealFacilities);
  revealFacilities();


  /* ================= LEFT / RIGHT SCROLL ================= */
  document.querySelectorAll(".animate-left, .animate-right").forEach(el => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) el.classList.add("active");
    }, { threshold: 0.3 }).observe(el);
  });


  /* ================= PRINCIPAL SECTION ================= */
  const principalSection = document.querySelector(".principal-section");
  if (principalSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        principalSection.classList.add("animate");
      }
    }, { threshold: 0.4 }).observe(principalSection);
  }

});


// galery section
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});



// testimonials section
const testimonials = [
    {
        text: "Shape Future School has been instrumental in my daughter's growth. The teachers are supportive and the curriculum is well-designed.",
        name: "Mr. Rajesh Sharma",
        role: "Parent of Arya (Class 4)",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "The school environment is safe, nurturing, and encourages creativity. My son loves going to school every day!",
        name: "Mrs. Sunita Verma",
        role: "Parent of Kabir (Class 2)",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        text: "Excellent faculty and modern teaching methods. The school focuses on both academics and moral values.",
        name: "Mr. Anil Patil",
        role: "Parent of Riya (Class 6)",
        img: "https://randomuser.me/api/portraits/men/65.jpg"
    }
];

let currentIndex = 0;

const textEl = document.getElementById("testimonialText");
const nameEl = document.getElementById("parentName");
const roleEl = document.getElementById("parentRole");
const imgEl = document.getElementById("profileImg");
const dots = document.querySelectorAll(".dot");

function updateTestimonial() {
    const t = testimonials[currentIndex];
    textEl.textContent = t.text;
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    imgEl.src = t.img;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

// Initial load
updateTestimonial();

// Auto slide every 5 seconds
setInterval(nextTestimonial, 5000);



// footer

// document.getElementById("year").textContent = new Date().getFullYear();



document.querySelectorAll(".footer-animate").forEach(el => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) el.classList.add("show");
  }, { threshold: 0.3 }).observe(el);
});

// Update year dynamically
document.getElementById("year").textContent = new Date().getFullYear();



// vision and mission section
// Fade-in animation on scroll
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".info-card");

    function showCards() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.classList.add("animate");
            }
        });
    }

    window.addEventListener("scroll", showCards);
    showCards(); // run once on load

});


// timeline section - works like counter animation
const timelineSection = document.querySelector(".timeline-section");
if (timelineSection) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !timelineSection.classList.contains('section-animated')) {
      timelineSection.classList.add('section-animated');

      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');

        if (content && dot) {
          // Much slower animation delays for better visibility while scrolling
          const contentDelay = index * 2500; // 2500ms (2.5 seconds) between content reveals - MUCH SLOWER
          const dotDelay = contentDelay + 1200; // Dots appear 1200ms after content - SLOWER

          setTimeout(() => {
            content.classList.add("show");
            // Add a subtle bounce effect
            content.style.animation = `premiumContentBounce 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
          }, contentDelay);

          setTimeout(() => {
            dot.classList.add("show");
          }, dotDelay);
        }
      });
    }
  }, { threshold: 0.3 }).observe(timelineSection); // Triggers when user is in the section (30% visible)

  // Add premium content bounce animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes premiumContentBounce {
      0% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-8px) scale(1.02); }
      100% { transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// <!-- methodology-section -->
/* ================= METHODOLOGY ANIMATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".methodology-section");
  const left = document.querySelector(".methodology-animate-left");
  const right = document.querySelector(".methodology-animate-right");
  const items = document.querySelectorAll(".method-item");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          left.classList.add("show");
          right.classList.add("show");

          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("show"), i * 120);
          });

          obs.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});

