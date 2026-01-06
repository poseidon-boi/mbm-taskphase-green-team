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
