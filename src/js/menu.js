const menu = () => {
  const HIDE = "hide";

  const openBtn = document.querySelector(".header-top-menu");
  const menu = document.querySelector(".menu");
  const closeBtn = menu.querySelectorAll(".menu-close");
  const search = document.querySelector(".search");

  const homeCatalogBtn = menu.querySelector("#home-catalog");
  const clubsCatalogBtn = menu.querySelector("#clubs-catalog");

  const homeWindow = menu.querySelector(".menu-home");
  const clubsWindow = menu.querySelector(".menu-clubs");
  const mainWIndow = menu.querySelector(".menu-main");

  const backBtn = menu.querySelectorAll(".button-back");

  openBtn.addEventListener("click", () => {
    if (!search.classList.contains(HIDE)) {
      search.classList.add(HIDE);
    }
    mainWIndow.classList.remove(HIDE);
    menu.classList.remove(HIDE);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!homeWindow.classList.contains(HIDE)) {
        homeWindow.classList.add(HIDE);
      }
      if (!clubsWindow.classList.contains(HIDE)) {
        clubsWindow.classList.add(HIDE);
      }
      menu.classList.add(HIDE);
    });
  });

  homeCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add(HIDE);
    homeWindow.classList.remove(HIDE);
  });

  clubsCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add(HIDE);
    clubsWindow.classList.remove(HIDE);
  });

  backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.back === "home") {
        homeWindow.classList.add(HIDE);
      }
      if (btn.dataset.back === "clubs") {
        clubsWindow.classList.add(HIDE);
      }
      mainWIndow.classList.remove(HIDE);
    });
  });
};

menu();
