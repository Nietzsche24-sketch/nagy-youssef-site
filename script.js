document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  const navLinks = siteNav.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 960) {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ny-adhd-form");
  const result = document.getElementById("ny-adhd-result");

  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let total = 0;
      const entries = new FormData(form);

      for (const [, value] of entries.entries()) {
        total += Number(value);
      }

      let summary = "";
      if (total <= 8) {
        summary = "Your responses suggest relatively few ADHD-related concerns in this brief reflection.";
      } else if (total <= 16) {
        summary = "Your responses suggest some recurring ADHD-related patterns worth reflecting on further.";
      } else if (total <= 24) {
        summary = "Your responses suggest a moderate level of recurring ADHD-related difficulty across daily life.";
      } else {
        summary = "Your responses suggest frequent ADHD-related patterns that may be worth discussing further in a thoughtful setting.";
      }

      result.innerHTML = `
        <h2>Your reflection summary</h2>
        <p><strong>Total score:</strong> ${total} / 30</p>
        <p>${summary}</p>
        <p>This summary is reflective only. It is not diagnosis, treatment, or medical advice.</p>
      `;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ny-adhd-form");
  const result = document.getElementById("ny-adhd-result");
  const downloadButton = document.getElementById("download-ny-adhd");
  const printButton = document.getElementById("print-ny-adhd");

  function getSummary(total) {
    if (total <= 8) {
      return "Your responses suggest relatively few ADHD-related concerns in this brief reflection.";
    } else if (total <= 16) {
      return "Your responses suggest some recurring ADHD-related patterns worth reflecting on further.";
    } else if (total <= 24) {
      return "Your responses suggest a moderate level of recurring ADHD-related difficulty across daily life.";
    }
    return "Your responses suggest frequent ADHD-related patterns that may be worth discussing further in a thoughtful setting.";
  }

  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let total = 0;
      const entries = new FormData(form);

      for (const [, value] of entries.entries()) {
        total += Number(value);
      }

      const summary = getSummary(total);

      result.innerHTML = `
        <h2>Your reflection summary</h2>
        <p><strong>Total score:</strong> ${total} / 30</p>
        <p>${summary}</p>
        <p>This summary is reflective only. It is not diagnosis, treatment, or medical advice.</p>
      `;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (downloadButton && form) {
    downloadButton.addEventListener("click", function () {
      const entries = new FormData(form);
      let total = 0;
      let lines = [
        "NY-ADHD Questionnaire",
        "Nagy Youssef Website",
        "",
      ];

      for (let i = 1; i <= 10; i++) {
        const value = entries.get("q" + i);
        const numeric = value ? Number(value) : "";
        if (value !== null) {
          total += numeric;
        }
        lines.push(`Question ${i}: ${value === null ? "Not answered" : value}`);
      }

      lines.push("");
      lines.push(`Total Score: ${total} / 30`);
      lines.push(getSummary(total));
      lines.push("");
      lines.push("Reflective use only. Not diagnosis or medical advice.");

      const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ny-adhd-responses.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }
});
