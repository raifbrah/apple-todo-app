const section__content = document.querySelector(".section__content");
const sectionHeader = document.querySelector(".section-header");
const sectionHeader__title = document.querySelector(".section-header__title");

section__content.addEventListener("scroll", () => {
  let scroll = section__content.scrollTop;

  if (scroll > 14) {
    sectionHeader.style.borderBottom = "1px solid var(--color_border)";
  } else {
    sectionHeader.style.borderBottom = "none";
  }

  if (scroll > 40) {
    sectionHeader__title.classList.add("section-header__title_visible");
  } else {
    sectionHeader__title.classList.remove("section-header__title_visible");
  }
});
