window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const video = document.getElementById("loaderVideo");

  // Try to force playback
  if (video) {
    video.play().catch(() => {
      console.warn("Autoplay blocked, showing fallback");
    });
  }

  // Remove loader once page is ready
  setTimeout(() => {
    loader.classList.add("hide");
  }, 800); // adjust to taste
});


document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  faders.forEach(el => observer.observe(el));
});
    
document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".title");

  titles.forEach(el => {
    // Prevent re-running on reload / hot refresh
    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    const text = el.textContent;
    el.textContent = "";

    let index = 0;
    const speed = 150;

    function typeWriter() {
      if (index < text.length) {
        el.textContent += text[index];
        index++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("toc");
  const toggle = document.getElementById("toc-toggle");
  const headings = document.querySelectorAll("#content h2, #content h3");

  const ul = document.createElement("ul");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index}`;
    }

    const li = document.createElement("li");
    if (heading.tagName === "H3") {
      li.classList.add("indent");
    }

    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;

    li.appendChild(a);
    ul.appendChild(li);
  });

  toc.appendChild(ul);

 const links = toc.querySelectorAll("a");

function updateActiveTocLink() {
  let currentId = null;

  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect();

    // header has passed the top third of the viewport
    if (rect.top <= window.innerHeight * 0.33) {
      currentId = heading.id;
    }
  });

  if (!currentId) return;

  links.forEach(link => link.classList.remove("active"));

  const activeLink = toc.querySelector(`a[href="#${currentId}"]`);
  if (activeLink) activeLink.classList.add("active");
}

// Run on scroll + once on load
window.addEventListener("scroll", updateActiveTocLink);
window.addEventListener("load", updateActiveTocLink);
});


document.querySelectorAll('.picture-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const imgs = toggle.querySelectorAll('img');
    imgs.forEach(img => img.classList.toggle('active'));
  });
});

const video = document.getElementById("footerVideo");

  video.addEventListener("click", () => {
    console.log("clicked");
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.error("Play failed:", err);
      });
    }
  });

  video.addEventListener("ended", () => {
    video.pause();
    video.currentTime = 0;
  });

  const slides = [

  {
    title: "SMELL IS THE ONLY HUMAN SENSE SO DEEPLY INTERTWINED WITH MEMORY",
    text: "as compared to memories triggered by other senses, odor-evoked memories are more emotional and more likely to extend back earlier in one’s life."
  },
  {
    title: "SMELL HAS A DIRECT PATH TO HUMAN MEMORY",
    text: "A trace of a fragrance can resurrect moments long forgotten, vivid and emotionally precise."
  },
  {
    title: "FRAGRANCE SHAPES MOOD BEFORE IT DOES OUR AWARENESS",
    text: "unlike the other senses, it's registered emotionally rather than cognitively, affecting our heart rather than our limbic systems."
  }
];

let currentSlide = 0;

const titleEl = document.getElementById("carousel-title");
const textEl = document.getElementById("carousel-text");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

function updateSlide() {
  const content = document.querySelector(".carousel-content");
  content.style.opacity = 0;

  setTimeout(() => {
    titleEl.textContent = slides[currentSlide].title;
    textEl.textContent = slides[currentSlide].text;
    content.style.opacity = 1;
  }, 150);
}


leftArrow.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
});

rightArrow.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
});




