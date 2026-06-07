(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("[data-nav-menu]");
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  const year = document.querySelector("[data-year]");
  const toast = document.querySelector("[data-toast]");
  const copyButton = document.querySelector("[data-copy-email]");
  const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));
  const themeSwitcher = document.querySelector("[data-theme-switcher]");
  const themeTrigger = document.querySelector("[data-theme-trigger]");
  const themeMenu = document.querySelector("#theme-menu");

  const closeThemeMenu = () => {
    if (!themeMenu || !themeTrigger) {
      return;
    }

    themeMenu.hidden = true;
    themeTrigger.setAttribute("aria-expanded", "false");
  };

  const setTheme = (theme) => {
    const selectedTheme = ["dark", "light", "colorblind"].includes(theme) ? theme : "dark";
    document.documentElement.dataset.theme = selectedTheme;

    themeButtons.forEach((button) => {
      button.setAttribute("aria-checked", String(button.getAttribute("data-theme-option") === selectedTheme));
    });

    try {
      localStorage.setItem("vish-ai-theme", selectedTheme);
    } catch (error) {
      // Ignore storage failures; the page still updates for the current session.
    }
  };

  setTheme(document.documentElement.dataset.theme || "light");

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(button.getAttribute("data-theme-option"));
      closeThemeMenu();
    });
  });

  if (themeTrigger && themeMenu) {
    themeTrigger.addEventListener("click", () => {
      const isOpen = themeMenu.hidden;
      themeMenu.hidden = !isOpen;
      themeTrigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (themeSwitcher && !themeSwitcher.contains(event.target)) {
        closeThemeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeThemeMenu();
      }
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (copyButton && toast) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.getAttribute("data-copy-email");

      try {
        await navigator.clipboard.writeText(email);
        toast.hidden = false;
        window.setTimeout(() => {
          toast.hidden = true;
        }, 2200);
      } catch (error) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
