document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".title");

  titles.forEach(el => {
    // Prevent re-running on reload / hot refresh
    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    const text = el.textContent;
    el.textContent = "";

    let index = 0;
    const speed = 250;

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

  /* ===== ACTIVE SECTION HIGHLIGHT ===== */
  const links = toc.querySelectorAll("a");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.remove("active"));
          const activeLink = toc.querySelector(
            `a[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    }
  );

  headings.forEach(h => observer.observe(h));

  /* ===== MOBILE TOGGLE ===== */
  toggle.addEventListener("click", () => {
    toc.classList.toggle("open");
  });
});

