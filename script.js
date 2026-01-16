window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      loader.remove();
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



