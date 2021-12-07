const modal = (modal, openBtn, closeBtn) => {
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("modal_active");
    });
  });
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("modal_active");
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      modal.classList.remove("modal_active");
    }
  });
};
;
const chooseCity = () => {
  const cityOpenBtn = document.querySelectorAll(".city-btn");
  const cityModal = document.querySelector(".modal-city");
  const cityCloseBtn = cityModal.querySelector(".modal-city-content-button");
  const searchCityBtn = cityModal.querySelector(
    ".modal-city-content-form-button"
  );
  const inputCity = cityModal.querySelector(".modal-city-content-form__input");
  const choosenCityName = document.querySelector(".header-city__item");

  modal(cityModal, cityOpenBtn, cityCloseBtn);
  searchCityBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputCity.value.trim()) {
      choosenCityName.textContent = inputCity.value;
      cityModal.classList.remove("modal_active");
      inputCity.value = "";
    }
  });
  /*cityOpenBtn.addEventListener("click", () => {
    inputCity.value = "";
    cityModal.classList.add("modal_active");
  });
  cityCloseBtn.addEventListener("click", () => {
    cityModal.classList.remove("modal_active");
  });

  cityModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      cityModal.classList.remove("modal_active");
    }
  });*/
};

chooseCity();

const phoneModal = () => {
  const choosePhoneBtn = document.querySelector(".header-phone-choosen");
  const allPhonesBlock = document.querySelector(".header-phone-open");
  const selectedPhone = document.querySelectorAll(".header-phone-open__item");

  choosePhoneBtn.addEventListener("click", () => {
    allPhonesBlock.classList.remove("hide");
  });

  selectedPhone.forEach((item) => {
    item.addEventListener("click", () => {
      console.log();
      allPhonesBlock.classList.add("hide");
      choosePhoneBtn.querySelector(
        ".header-phone-choosen__item"
      ).innerHTML = `<span class="header-phone-choosen__item_white">${item.children[0].dataset.phone}</span> ${item.children[1].dataset.city}`;
    });
  });
};

phoneModal();

const callback = () => {
  const openBtn = document.querySelectorAll(".callBack-btn");
  const modalCall = document.querySelector(".modal-call");
  const closeBtn = modalCall.querySelector(".modal-call-content-button");
  const callBackBtn = modalCall.querySelector(
    ".modal-call-content-form__button"
  );
  const inputs = modalCall.querySelectorAll(".modal-call-content-form__input");
  const successMessage = document.querySelector(
    ".modal-call-content-form-text_success"
  );

  modal(modalCall, openBtn, closeBtn);

  let nameIsValid = true;
  let phoneIsValid = true;

  const validText = (input) => {
    if (input.value.trim().length <= 1) {
      input.style.borderColor = "#f53b49";
      nameIsValid = false;
    }
  };

  const validPhone = (input) => {
    const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const valid = re.test(input.value);
    if (!valid) {
      input.style.borderColor = "#f53b49";
      document
        .querySelector(".modal-call-content-form__error")
        .classList.remove("hide");
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = `rgba(144,156,181,.5)`;
      document
        .querySelector(".modal-call-content-form__error")
        .classList.add("hide");
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = `rgba(144,156,181,.5)`;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = `rgba(144,156,181,.5)`;
          document
            .querySelector(".modal-call-content-form__error")
            .classList.add("hide");
        });
        validPhone(input);
      }
    });
  };

  callBackBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validation(inputs);
    if (nameIsValid && phoneIsValid) {
      inputs.forEach((input) => (input.value = ""));
      successMessage.classList.remove("hide");
      setTimeout(() => {
        modalCall.classList.remove("modal_active");
        successMessage.classList.add("hide");
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callback();

const catalog = () => {
  const hide = "hide";

  const openBtn = document.querySelector(".header-navigation-catalog__button");
  const catalogBlock = document.querySelector(".modal-catalog");
  const body = document.querySelector("body");
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

  const catalogCalegoryName = document.querySelector(
    ".modal-catalog-category-name__item"
  );

  openBtn.addEventListener("click", () => {
    searchBlock.classList.add(hide);
    categoryClubs.classList.add(hide);
    categoryHome.classList.remove(hide);
    catalogBlock.classList.toggle("modal_active");
  });

  homeCatalogBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.dataset.category === "home") {
        console.dir(e);
        categoryClubs.classList.add(hide);
        categoryHome.classList.remove(hide);
        homeCategoryBtn.classList.add("catalog-type__item_active");
        clubsCategoryBtn.classList.remove("catalog-type__item_active");
      } else if (e.target.dataset.category === "clubs") {
        categoryHome.classList.add(hide);
        categoryClubs.classList.remove(hide);
        clubsCategoryBtn.classList.add("catalog-type__item_active");
        homeCategoryBtn.classList.remove("catalog-type__item_active");
      }
      catalogBlock.classList.add("modal_active");
    });
  });

  homeCategoryBtn.addEventListener("click", () => {
    categoryHome.classList.remove(hide);
    categoryClubs.classList.add(hide);
    homeCategoryBtn.classList.add("modal-catalog-type__item_active");
    clubsCategoryBtn.classList.remove("modal-catalog-type__item_active");
  });

  clubsCategoryBtn.addEventListener("click", () => {
    categoryClubs.classList.remove(hide);
    categoryHome.classList.add(hide);
    clubsCategoryBtn.classList.add("modal-catalog-type__item_active");
    homeCategoryBtn.classList.remove("modal-catalog-type__item_active");
  });

  catalogWrapper.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      catalogBlock.classList.remove("modal_active");
    }
  });

  window.addEventListener("scroll", () => {
    if (
      catalogBlock.classList.contains("modal_active") &&
      pageYOffset > catalogBlock.offsetHeight - 50
    ) {
      catalogBlock.classList.remove("modal_active");
    }
  });
};

catalog();

const search = () => {
  const modal_active = "modal_active";
  const openBtn = document.querySelectorAll(".search-btn");
  const searchBlock = document.querySelector(".search");
  const closeBtn = searchBlock.querySelector(".search-form-button");

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchBlock.classList.add(modal_active);
    });
  });
  closeBtn.addEventListener("click", () => {
    searchBlock.classList.remove(modal_active);
  });

  searchBlock.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      searchBlock.classList.remove("modal_active");
    }
  });

  window.addEventListener("scroll", () => {
    if (
      searchBlock.classList.contains("modal_active") &&
      pageYOffset > searchBlock.offsetHeight - 50
    ) {
      searchBlock.classList.remove("modal_active");
    }
  });
};

search();

const tabs = () => {
  const modal_active = "modal_active";

  const openCart = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const openCartSvg = document.querySelector(
    ".header-navigation-buttons-item__img_cart"
  );
  const cart = document.querySelector(".modal-cart");

  const openComparison = document.querySelector(
    ".header-navigation-buttons-item_comparison"
  );
  const openComparisonSvg = document.querySelector(
    ".header-navigation-buttons-item__img_comparison"
  );
  const comparison = document.querySelector(".modal-comparison");

  const openFavorite = document.querySelector(
    ".header-navigation-buttons-item_favorite"
  );
  const openFavoriteSvg = document.querySelector(
    ".header-navigation-buttons-item__img_favorite"
  );
  const favorite = document.querySelector(".modal-favorite");

  openCart.addEventListener("click", () => {
    openCartSvg.classList.toggle("header-navigation-buttons-item__img_active");
    cart.classList.toggle(modal_active);
  });

  openComparison.addEventListener("click", () => {
    openComparisonSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    comparison.classList.toggle(modal_active);
  });

  openFavorite.addEventListener("click", () => {
    openFavoriteSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    favorite.classList.toggle(modal_active);
  });

  const closeModal = (...args) => {
    args.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("modal_active") ||
          e.target.classList.contains("modal-wrapper")
        ) {
          modal.classList.remove("modal_active");
          document
            .querySelectorAll(".header-navigation-buttons-item__img_active")
            .forEach((button) => {
              button.classList.remove(
                "header-navigation-buttons-item__img_active"
              );
            });
        }
      });
    });
  };
  closeModal(favorite, cart, comparison);
};

tabs();

const cart = () => {};

cart();

const comparison = () => {};

comparison();

const favorite = () => {};

favorite();

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
