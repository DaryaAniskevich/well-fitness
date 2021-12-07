const menu = () => {
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
    if (!search.classList.contains("hide")) {
      search.classList.add("hide");
    }
    mainWIndow.classList.remove("hide");
    menu.classList.remove("hide");
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!homeWindow.classList.contains("hide")) {
        homeWindow.classList.add("hide");
      }
      if (!clubsWindow.classList.contains("hide")) {
        clubsWindow.classList.add("hide");
      }
      menu.classList.add("hide");
    });
  });

  homeCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add("hide");
    homeWindow.classList.remove("hide");
  });

  clubsCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add("hide");
    clubsWindow.classList.remove("hide");
  });

  backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.back === "home") {
        homeWindow.classList.add("hide");
      }
      if (btn.dataset.back === "clubs") {
        clubsWindow.classList.add("hide");
      }
      mainWIndow.classList.remove("hide");
    });
  });
};

menu();
