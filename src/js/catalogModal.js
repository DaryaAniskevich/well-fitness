const catalogModal = () => {
  const active_btn = "modal-catalog-type__item_active";

  const openBtn = document.querySelector(".header-navigation-catalog__button");
  const catalogBlock = document.querySelector(".modal-catalog");
  const searchBlock = document.querySelector(".search");
  const catalogWrapper = catalogBlock.querySelector(".modal-wrapper");

  const homeCatalogBtn = document.querySelectorAll(".header-menu-item");
  const categoryHome = document.querySelector(".modal-catalog-category-home");
  const categoryClubs = document.querySelector(".modal-catalog-category-clubs");

  const homeCategoryBtn = document.querySelector(
    ".modal-catalog-type__item_home"
  );
  const clubsCategoryBtn = document.querySelector(
    ".modal-catalog-type__item_clubs"
  );

  openBtn.addEventListener("click", () => {
    searchBlock.classList.add(hide);
    categoryClubs.classList.add(hide);
    categoryHome.classList.remove(hide);
    homeCategoryBtn.classList.add("modal-catalog-type__item_active");
    catalogBlock.classList.toggle(modal_active);
  });

  homeCatalogBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.dataset.category === "home") {
        categoryClubs.classList.add(hide);
        categoryHome.classList.remove(hide);
        homeCategoryBtn.classList.add(active_btn);
        clubsCategoryBtn.classList.remove(active_btn);
      } else if (e.target.dataset.category === "clubs") {
        categoryHome.classList.add(hide);
        categoryClubs.classList.remove(hide);
        clubsCategoryBtn.classList.add(active_btn);
        homeCategoryBtn.classList.remove(active_btn);
      }
      catalogBlock.classList.add(modal_active);
    });
  });

  homeCategoryBtn.addEventListener("click", () => {
    categoryHome.classList.remove(hide);
    categoryClubs.classList.add(hide);
    homeCategoryBtn.classList.add(active_btn);
    clubsCategoryBtn.classList.remove(active_btn);
  });

  clubsCategoryBtn.addEventListener("click", () => {
    categoryClubs.classList.remove(hide);
    categoryHome.classList.add(hide);
    clubsCategoryBtn.classList.add(active_btn);
    homeCategoryBtn.classList.remove(active_btn);
  });

  catalogWrapper.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      catalogBlock.classList.remove(modal_active);
    }
  });

  window.addEventListener("scroll", () => {
    if (
      catalogBlock.classList.contains(modal_active) &&
      pageYOffset > catalogBlock.offsetHeight - 50
    ) {
      catalogBlock.classList.remove(modal_active);
    }
  });
};

catalogModal();
