const releaseDate = new Date("2026-06-26T00:00:00+02:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = releaseDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal animation on scroll - repeats when scrolling up/down
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.25,
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

// Active section dots
const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.getAttribute("id");

        dots.forEach(function (dot) {
          dot.classList.remove("active");

          if (dot.getAttribute("href") === `#${currentSectionId}`) {
            dot.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.55,
  }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});