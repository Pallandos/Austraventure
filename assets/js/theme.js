const STORAGE_KEY = "theme";
const THEME_ATTR  = "data-theme";
const QUERY_KEY   = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    // Storage theme
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia(QUERY_KEY).matches) {
    // system theme
    setTheme(themes.DARK);
  } else {
    // Default theme
    setTheme(themes.LIGHT);
  }

  // Watch for system theme changes
  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".lightbox-trigger");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox-overlay");
    lightbox.innerHTML = `
      <span class="close-btn">&times;</span>
      <img src="" alt="Lightbox Image">
    `;
    document.body.appendChild(lightbox);
  
    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".close-btn");
  
    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        e.preventDefault();
        lightboxImage.src = image.getAttribute("data-lightbox-src");
        lightbox.classList.add("active");
      });
    });
  
    closeButton.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  });