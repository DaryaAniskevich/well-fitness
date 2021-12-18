const modal_active = "modal_active";
const hide = "hide";
const RED = "#f53b49";
const GRAY = "rgba(144,156,181,.3)";

const modal = (modal, openBtn, closeBtn) => {
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add(modal_active);
      modal.querySelector("input").focus();
    });
  });
  closeBtn.addEventListener("click", () => {
    modal.classList.remove(modal_active);
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      modal.classList.remove(modal_active);
    }
  });
};

const chooseCity = () => {
  const cityOpenBtn = document.querySelectorAll(".city-btn");
  const cityModal = document.querySelector(".modal-city");
  const cityCloseBtn = cityModal.querySelector(".modal-city-content-button");
  const searchCityBtn = cityModal.querySelector(
    ".modal-city-content-form-button"
  );
  const inputCity = cityModal.querySelector(".modal-city-content-form__input");
  const choosenCityName = document.querySelectorAll(".city-btn__item");
  const message = cityModal.querySelector(".modal-city-content__text_message");
  const cityInMessage = message.querySelector(".modal-city-content__text_city");
  const callButton = cityModal.querySelector(".callBack-btn");
  const phoneButtonContent = document.querySelector(
    ".header-phone-choosen__item"
  );
  const menuPhone = document.querySelector(".menu-catalog-phone__item");

  const clearModal = () => {
    inputCity.value = "";
    message.classList.add(hide);
  };

  const upperCaseCity = (item, separator) => {
    item.textContent = inputCity.value
      .split(separator)
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(separator);
  };

  const seacrhCity = (data) => {
    searchCityBtn.addEventListener("click", (e) => {
      e.preventDefault();
      message.classList.add(hide);
      const newArray = data.map((item) => item.toLowerCase());
      if (newArray.includes(inputCity.value.toLowerCase())) {
        choosenCityName.forEach((item) => {
          if (inputCity.value.includes(" ")) {
            upperCaseCity(item, " ");
          } else if (inputCity.value.includes("-")) {
            upperCaseCity(item, "-");
          } else {
            item.textContent =
              inputCity.value[0].toUpperCase() + inputCity.value.slice(1);
          }
        });

        if (inputCity.value.toLowerCase() !== "москва") {
          phoneButtonContent.innerHTML = `<span class="header-phone-choosen__item_white">+7 (800) 000-00-00</span> регионы`;
          menuPhone.textContent = "+7 (800) 000-00-00";
        } else if (inputCity.value.toLowerCase() === "москва") {
          phoneButtonContent.innerHTML = `<span class="header-phone-choosen__item_white">+7 (800) 999-00-00</span> МСК`;
          menuPhone.textContent = "+7 (800) 999-00-00";
        }
        clearModal();
        cityModal.classList.remove(modal_active);
      } else {
        cityInMessage.innerHTML = inputCity.value;
        message.classList.remove(hide);
      }
    });
  };

  modal(cityModal, cityOpenBtn, cityCloseBtn);

  cityCloseBtn.addEventListener("click", () => {
    clearModal();
  });

  callButton.addEventListener("click", () => {
    cityModal.classList.remove(modal_active);
    clearModal();
  });

  cityModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      clearModal();
    }
  });

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/cities.json"
  )
    .then((res) => res.json())
    .then((res) => seacrhCity(res));
};

chooseCity();

const phoneModal = () => {
  const choosePhoneBtn = document.querySelector(".header-phone-choosen");
  const allPhonesBlock = document.querySelector(".header-phone-open");
  const selectedPhone = document.querySelectorAll(".header-phone-open__item");
  const phoneButtonContent = choosePhoneBtn.querySelector(
    ".header-phone-choosen__item"
  );

  choosePhoneBtn.addEventListener("click", () => {
    allPhonesBlock.classList.remove(hide);
  });

  selectedPhone.forEach((item) => {
    item.addEventListener("click", () => {
      allPhonesBlock.classList.add(hide);
      phoneButtonContent.innerHTML = `<span class="header-phone-choosen__item_white">${item.children[0].dataset.phone}</span> ${item.children[1].dataset.city}`;
    });
  });
};

phoneModal();

const callRequest = () => {
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
  const errorMessage = document.querySelector(
    ".modal-call-content-form__error"
  );

  let nameIsValid = true;
  let phoneIsValid = true;

  modalCall.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper") ||
      e.target.classList.contains("modal-call-content-button") ||
      e.target.classList.contains("modal-button__svg")
    ) {
      successMessage.classList.add(hide);
      nameIsValid = true;
      phoneIsValid = true;
      inputs.forEach((input) => (input.style.borderColor = GRAY));
      errorMessage.classList.add(hide);
    }
  });

  modal(modalCall, openBtn, closeBtn);

  const validText = (input) => {
    if (input.value.trim().length <= 1) {
      input.style.borderColor = RED;
      nameIsValid = false;
    }
  };

  const validPhone = (input) => {
    const value = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const valid = value.test(input.value);
    if (!valid) {
      input.style.borderColor = RED;
      errorMessage.classList.remove(hide);
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = GRAY;
      errorMessage.classList.add(hide);
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
          errorMessage.classList.add(hide);
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
      successMessage.classList.remove(hide);
      setTimeout(() => {
        modalCall.classList.remove(modal_active);
        successMessage.classList.add(hide);
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callRequest();

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

const search = () => {
  const openBtn = document.querySelectorAll(".search-btn");
  const searchModal = document.querySelector(".search");
  const closeBtn = searchModal.querySelector(".search-form-button");
  const input = searchModal.querySelector(".search-form__input");
  const numberOfGoods = searchModal.querySelector(
    ".search-result-header__number"
  );
  const searchResult = searchModal.querySelector(".search-result-main");
  const categoryButtons = searchModal.querySelectorAll(
    ".search-result-header-buttons__item"
  );

  let placeFilter = "";

  modal(searchModal, openBtn, closeBtn);

  const clearSearch = () => {
    searchResult.innerHTML = "";
    input.value = "";
    numberOfGoods.innerHTML = "0 товаров";
    placeFilter = "";
    categoryButtons.forEach((button) => {
      button.classList.remove("button_full-white");
    });
  };

  searchModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("search-form-button") ||
      e.target.classList.contains("search-form-button__svg") ||
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      clearSearch();
    }
  });

  const renderCards = (data) => {
    searchResult.innerHTML = "";
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "search-result-main-item",
        "good-card",
        "good-card_search"
      );
      div.setAttribute("data-href", item.href);
      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      div.innerHTML = `
      <img src="./images/db/${item.img}" alt="${
        item.name
      }" class="good-card__image good-card__image_search"/>
      <div class="good-card-description">
        <h4 class="good-card__heading good-card__heading_search">${
          item.name
        }</h4>
        <div class="good-card-rating good-card-rating_search">Рейтинг ${'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0.5L7.91148 3.86908L11.7063 4.6459L9.09284 7.50492L9.52671 11.3541L6 9.752L2.47329 11.3541L2.90716 7.50492L0.293661 4.6459L4.08852 3.86908L6 0.5Z" fill="#F99808"/></svg>'.repeat(
          Math.round(item.raiting)
        )}</div>
        <div class="good-card-bottom">
          <div class="good-card-price">
            <div class="good-card-price__item good-card-price__item_search">${
              item.discountPrice ? item.discountPrice : item.price
            } ₽</div>
          </div>
        </div>
      </div>
    `;
      searchResult.append(div);
    });
  };

  const declOfNum = (n, text_forms) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
      return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text_forms[1];
    }
    if (n1 === 1) {
      return text_forms[0];
    }
    return text_forms[2];
  };

  const searchGoods = (data) => {
    let filteredData = [];
    input.addEventListener("input", () => {
      filteredData = data.filter((item) => {
        return placeFilter
          ? (item.keywords.toLowerCase().includes(input.value.toLowerCase()) ||
              item.name.toLowerCase().includes(input.value.toLowerCase())) &&
              item.place.toLowerCase().includes(placeFilter)
          : item.keywords.toLowerCase().includes(input.value.toLowerCase()) ||
              item.name.toLowerCase().includes(input.value.toLowerCase());
      });
      numberOfGoods.innerHTML = `${filteredData.length} ${declOfNum(
        filteredData.length,
        ["товар", "товара", "товаров"]
      )}`;
      renderCards(filteredData.slice(0, 10));
    });

    categoryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        categoryButtons.forEach((btn) => {
          btn.classList.remove("button_full-white");
        });
        placeFilter = e.target.dataset.category;
        let doubleFilteredData = [];
        doubleFilteredData = filteredData.filter((item) => {
          return item.place.toLowerCase().includes(e.target.dataset.category);
        });
        numberOfGoods.innerHTML = `${doubleFilteredData.length} ${declOfNum(
          doubleFilteredData.length,
          ["товар", "товара", "товаров"]
        )}`;
        renderCards(doubleFilteredData.slice(0, 10));
        e.target.classList.add("button_full-white");
      });
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/goods.json"
  )
    .then((res) => res.json())
    .then((res) => searchGoods(res));
};

search();

const tabs = () => {
  const button_active = "header-navigation-buttons-item__img_active";

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
    openCartSvg.classList.toggle(button_active);
    cart.classList.toggle(modal_active);
  });

  openComparison.addEventListener("click", () => {
    openComparisonSvg.classList.toggle(button_active);
    comparison.classList.toggle(modal_active);
  });

  openFavorite.addEventListener("click", () => {
    openFavoriteSvg.classList.toggle(button_active);
    favorite.classList.toggle(modal_active);
  });

  const closeModal = (...args) => {
    args.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (
          e.target.classList.contains(modal_active) ||
          e.target.classList.contains("modal-wrapper")
        ) {
          modal.classList.remove(modal_active);
          document
            .querySelectorAll(".header-navigation-buttons-item__img_active")
            .forEach((button) => {
              button.classList.remove(button_active);
            });
        }
      });
    });
  };
  closeModal(favorite, cart, comparison);
};

tabs();

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
    if (!search.classList.contains(hide)) {
      search.classList.add(hide);
    }
    mainWIndow.classList.remove(hide);
    menu.classList.remove(hide);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!homeWindow.classList.contains(hide)) {
        homeWindow.classList.add(hide);
      }
      if (!clubsWindow.classList.contains(hide)) {
        clubsWindow.classList.add(hide);
      }
      menu.classList.add(hide);
    });
  });

  homeCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add(hide);
    homeWindow.classList.remove(hide);
  });

  clubsCatalogBtn.addEventListener("click", () => {
    mainWIndow.classList.add(hide);
    clubsWindow.classList.remove(hide);
  });

  backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.back === "home") {
        homeWindow.classList.add(hide);
      }
      if (btn.dataset.back === "clubs") {
        clubsWindow.classList.add(hide);
      }
      mainWIndow.classList.remove(hide);
    });
  });
};

menu();

const sign = () => {
  const openBtns = document.querySelectorAll(".sign-block__button");
  const signModal = document.querySelector(".sign");
  const closeBtn = signModal.querySelector(".modal-button");

  const signInBlock = signModal.querySelector(".sign-in");
  const signInBtn = signModal.querySelector(".sign-form__button_signin");
  const showRetoreBlockBtn = signModal.querySelector(
    ".sign-form__button_password"
  );
  const restorePassworBlock = signModal.querySelector(".sign-restore-password");
  const restorePasswordBtn = signModal.querySelector(
    ".sign-form__button_restore"
  );
  const password = signModal.querySelector(
    ".sign-form__input[type='password']"
  );
  const email = signModal.querySelector(".sign-form__input[type='email']");
  const emailRestore = signModal.querySelector(".sign-form__input_restore");
  const showPasswordBtn = signModal.querySelector(
    ".sign-form__button_show-pswd"
  );
  const errorMessage = signModal.querySelector(".sign__error");

  modal(signModal, openBtns, closeBtn);

  const cleanInputs = (...inputs) => {
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = GRAY;
    });
  };
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cleanInputs(email, emailRestore, password);

      errorMessage.classList.add(hide);
      if (signInBlock.classList.contains(hide)) {
        signInBlock.classList.remove(hide);
        restorePassworBlock.classList.add(hide);
      }
    });
  });

  showRetoreBlockBtn.addEventListener("click", (e) => {
    e.preventDefault();
    restorePassworBlock.classList.remove(hide);
    signInBlock.classList.add(hide);
  });

  const validationMail = (email) => {
    var re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  };

  const validationPassword = (password) => {
    const beginWithoutDigit = /^\D.*$/;
    const withoutSpecialChars = /^[^-() /]*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const minimum8Chars = /^.{8,}$/;
    const withoutSpaces = /^[\S]$/;
    return (
      beginWithoutDigit.test(password) &&
      withoutSpecialChars.test(password) &&
      containsLetters.test(password) &&
      minimum8Chars &&
      withoutSpaces
    );
  };

  const showPassword = (input) => {
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };

  signInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(email.value)) {
      email.style.borderColor = RED;
    }
    if (!validationPassword(password.value)) {
      password.style.borderColor = RED;
    }
    errorMessage.classList.remove(hide);
  });

  restorePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(emailRestore.value)) {
      emailRestore.style.borderColor = RED;
    }
    errorMessage.classList.remove(hide);
  });

  password.addEventListener("click", () => (password.style.borderColor = GRAY));
  email.addEventListener("click", () => (email.style.borderColor = GRAY));
  emailRestore.addEventListener(
    "click",
    () => (emailRestore.style.borderColor = GRAY)
  );

  showPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showPassword(password);
  });
};

sign();

const sliderBanner = () => {
  const slides = document.querySelectorAll(".banner-content");
  const slidesBlock = document.querySelector(".banner-wrapper");
  const prevBtn = document.querySelector(".banner-buttons__item_prev");
  const nextBtn = document.querySelector(".banner-buttons__item_next");
  const paginationBlock = document.querySelector(".banner-pagination");
  const paginationItem = document.querySelectorAll(".banner-pagination__item");

  let count = 0;
  let width;

  const rollSlider = (count) => {
    slidesBlock.style.transform = `translate(-${count * width}px)`;
  };

  const calculateSliderWidth = () => {
    width = document.querySelector(".banner-container").offsetWidth;
    slidesBlock.style.width = width * slides.length + "px";
    slides.forEach((slide) => {
      slide.style.maxWidth = 1800 + "px";
      slide.style.width = width + "px";
    });
  };

  calculateSliderWidth();

  const changeActivePaginationItem = () => {
    paginationItem.forEach((item) => {
      if (item.id == count) {
        item.classList.add("banner-pagination__item_active");
      } else {
        item.classList.remove("banner-pagination__item_active");
      }
    });
  };

  window.addEventListener("resize", () => {
    calculateSliderWidth();
  });

  const autoSlider = setInterval(() => {
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    changeActivePaginationItem();
    rollSlider(count);
  }, 5000);

  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlider);
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    rollSlider(count);
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlider);
    count--;
    if (count < 0) {
      count = slides.length - 1;
    }
    rollSlider(count);
  });

  slides.forEach((slide) => {
    slide.addEventListener("click", () => clearInterval(autoSlider));
  });

  let x1 = null;
  let y1 = null;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  };

  const handleTouchMove = (event) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      clearInterval(autoSlider);
      if (xDiff > 0) {
        count--;
        if (count <= 0) {
          count = 0;
        }
      } else {
        count++;
        if (count >= slides.length) {
          count = 0;
        }
      }
      changeActivePaginationItem();
      rollSlider(count);
    }
    x1 = null;
    y1 = null;

    return;
  };

  slidesBlock.addEventListener("touchstart", handleTouchStart, false);
  slidesBlock.addEventListener("touchmove", handleTouchMove, false);

  paginationBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("banner-pagination__item")) {
      paginationItem.forEach((item) => {
        if (event.target.id == item.id) {
          count = item.id;
          item.classList.add("banner-pagination__item_active");
        } else {
          item.classList.remove("banner-pagination__item_active");
        }
      });
      rollSlider(count);
    }
  });
};

sliderBanner();

const home = () => {
  const cardsBlock = document.querySelector(".home-cards");

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, title, href, img } = item;

      const div = document.createElement("div");
      div.setAttribute("data-href", href);
      div.classList.add("home-cards__item", "category-card");
      div.innerHTML = `<h3 class="category-card__heading">${title}</h3>
      <img src="./images/db/${img}" alt="${title}" class="category-card__img"/>`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      cardsBlock.append(div);
    });

    const cards = document.querySelectorAll(".home-cards__item");

    cards.forEach((item, index) => {
      if (index === 0 || index === 1) {
        item.classList.add("category-card_hight");
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_height");
      }
      if (index === 0) {
        item.classList.add("category-card_dark");
        item.classList.add("home-cards__item_one");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_white");
      }
      if (index === 1) {
        item.classList.add("home-cards__item_two");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_gray");
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/category/home.json"
  )
    .then((res) => res.json())
    .then((res) => renderCards(res));
};

home();

const clubs = () => {
  const clubsBlock = document.querySelector(".clubs-cards");

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, title, href, img } = item;

      const div = document.createElement("div");
      div.classList.add("clubs-cards__item", "category-card");
      div.setAttribute("data-href", href);
      div.innerHTML = `<h3 class="category-card__heading">${title}</h3>
      <img src="./images/db/${img}" alt="${title}" class="category-card__img"/>`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      clubsBlock.append(div);
    });

    const cards = document.querySelectorAll(".clubs-cards__item");

    cards.forEach((item, index) => {
      if (index === 0) {
        item.classList.add(
          "category-card_wide",
          "clubs-cards__item_one",
          "category-card_dark"
        );
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_wide");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_white");
      }
      if (index !== 0) {
        item.classList.add("category-card_square");
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_square");
      }

      item.querySelector("h3").classList.add("category-card__heading_wide");
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/category/club.json"
  )
    .then((res) => res.json())
    .then((res) => renderCards(res));
};

clubs();

const brands = () => {
  const active_button = "brands-buttons__item_active";
  const brandsBlock = document.querySelector(".brands-cards");
  const brandsButtons = document.querySelectorAll(".brands-buttons__item");

  let category = "all";

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, name, img, href } = item;
      const div = document.createElement("div");
      div.classList.add("brands-cards-item");
      div.setAttribute("data-href", href);
      div.innerHTML = `  <img src="./images/db/${img}" alt="${name}" class="brands-cards-item__img" />`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      brandsBlock.append(div);
    });
  };

  const getData = (category) => {
    fetch(
      `https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/brands/${category}.json`
    )
      .then((res) => res.json())
      .then((res) => renderCards(res));
  };

  brandsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      brandsButtons.forEach((button) => {
        button.classList.remove(active_button);
      });
      brandsBlock.innerHTML = "";
      button.classList.add(active_button);
      category = button.dataset.brand;
      getData(category);
    });
  });

  getData(category);
};

brands();

const news = () => {
  const newsBlock = document.querySelector(".news-cards");

  const renderBlock = (data) => {
    data.forEach((item, index) => {
      const { id, href, img, title, description, date } = item;
      if (index < 6) {
        const div = document.createElement("div");
        div.classList.add("news-cards__item", "news-card");
        div.setAttribute("data-href", href);

        div.innerHTML = `
        <img src="./images/db/${img}" alt="${title}" class="news-card__img" />
        <div class="news-card-content">
          <h4 class="news-card__heading">${title}</h4>
          <p class="news-card__paragraf">${description}</p>
          <p class="news-card__paragraf news-card__paragraf_light">${date}</p>
        </div>`;

        div.addEventListener("click", () => {
          window.location.href = div.dataset.href;
        });

        newsBlock.append(div);
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/news.json"
  )
    .then((res) => res.json())
    .then((res) => renderBlock(res));
};

news();

const catalogRender = (data, container) => {
  const active_category = "modal-catalog-category-name__item_active";

  const categories = [];

  const getCategories = (data) => {
    data.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
  };
  getCategories(data);

  const renderCategoriesName = (block) => {
    const categoryBlock = document.createElement("div");
    categoryBlock.classList.add("modal-catalog-category-name");

    categories.forEach((category) => {
      categoryBlock.innerHTML += `
        <div class="modal-catalog-category-name__item" data-category="${category}">
          ${category}
          <span class="modal-catalog-category-name__item_arrow">&#8594;</span>
        </div>`;
      block.append(categoryBlock);
    });
  };

  const renderSubcategories = (block, subcategory, href, img) => {
    block.innerHTML += `
      <div class="modal-catalog-category-subcategory-item" data-href=${href}>
        <img src="./images/db/${img}" alt="${subcategory}" class="modal-catalog-category-subcategory-item__img"/>
        <div class="modal-catalog-category-subcategory-item__title">
         ${subcategory}
        </div>
      </div>
    `;

    block
      .querySelectorAll(".modal-catalog-category-subcategory-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          window.location.href = item.dataset.href;
        });
      });
  };

  const renderCatalog = (data) => {
    const div = document.createElement("div");
    div.classList.add("modal-catalog-category-container");
    renderCategoriesName(div);

    const subcategoryBlock = document.createElement("div");
    subcategoryBlock.classList.add("modal-catalog-category-subcategory");

    div.append(subcategoryBlock);
    container.append(div);

    const categoryName = container.querySelectorAll(
      ".modal-catalog-category-name__item"
    );
    categoryName.forEach((item) => {
      item.addEventListener("click", () => {
        container.querySelector(
          ".modal-catalog-category-subcategory"
        ).innerHTML = "";
      });
    });

    data.forEach((item) => {
      const { id, category, subcategory, href, img } = item;

      if (category === categories[0]) {
        renderSubcategories(subcategoryBlock, subcategory, href, img);
      }

      const changeSubcategories = (container) => {
        const categoryName = container.querySelectorAll(
          ".modal-catalog-category-name__item"
        );
        categoryName.forEach((item) => {
          item.addEventListener("click", () => {
            categoryName.forEach((item) => {
              item.classList.remove(active_category);
            });
            item.classList.add(active_category);
            if (item.dataset.category === category) {
              renderSubcategories(subcategoryBlock, subcategory, href, img);
            }
          });
        });
      };
      changeSubcategories(container);
    });

    categoryName[0].classList.add(active_category);
  };

  renderCatalog(data);
};

const catalogHome = () => {
  const catalogHomeBlock = document.querySelector(
    ".modal-catalog-category-home"
  );

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/catalog/home.json"
  )
    .then((res) => res.json())
    .then((res) => {
      catalogRender(res, catalogHomeBlock);
    });
};

catalogHome();

const catalogClubs = () => {
  const catalogClubsBlock = document.querySelector(
    ".modal-catalog-category-clubs"
  );

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/catalog/club.json"
  )
    .then((res) => res.json())
    .then((res) => {
      catalogRender(res, catalogClubsBlock);
    });
};

catalogClubs();

const renderCartItems = (data) => {
  const hide = "hide";

  const modalCart = document.querySelector(".modal-cart");
  const cart = modalCart.querySelector(".tab-goods");
  const message = modalCart.querySelector(".modal-cart__message");

  cart.innerHTML = "";

  data.forEach(({ name, price, id, img, count }) => {
    message.classList.add(hide);
    const cartElem = document.createElement("div");
    cartElem.classList.add("tab-goods-item");
    cartElem.innerHTML = `
        <img src="./images/db/${img}" class="tab-goods-item__img" alt="${name}" />
        <div class="tab-goods-item__name">${name}</div>
        <div class="tab-goods-item-count">
          <div class="tab-goods-item-count-buttons">
            <button class="tab-goods-item-count-buttons__item tab-goods-item-count-buttons__item_dec button button_round button_red" data-index="${id}"> - </button>
            <span class="tab-goods-item-count__number">${count}</span>
            <button class="tab-goods-item-count-buttons__item tab-goods-item-count-buttons__item_inc button button_round button_red" data-index="${id}"> + </button>
          </div>
          <div class="tab-goods-item__price">${price * count} ₽</div>
        </div>

        <button class="tab-goods-item-button button button_unbordered" data-index="${id}">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg" data-index="${id}" class="tab-goods-item-button__svg"
          >
            <path
              d="M7.72959 1.57572L5.30563 3.99992L7.72959 6.42402C8.09014 6.78471 8.09014 7.36897 7.72959 7.72966C7.54944 7.90981 7.31325 7.99996 7.07718 7.99996C6.84071 7.99996 6.6045 7.90995 6.42449 7.72966L4.00001 5.30529L1.57571 7.72964C1.39559 7.90979 1.15938 7.99993 0.923098 7.99993C0.686888 7.99993 0.450838 7.90993 0.270551 7.72964C-0.09 7.36911 -0.09 6.78482 0.270551 6.424L2.69444 3.9999L0.270413 1.57572C-0.0901378 1.21516 -0.0901378 0.630758 0.270413 0.270207C0.630895 -0.090069 1.21496 -0.090069 1.57558 0.270207L3.99999 2.69442L6.42422 0.270207C6.78491 -0.090069 7.36904 -0.090069 7.72945 0.270207C8.09014 0.630758 8.09014 1.21516 7.72959 1.57572Z"
              fill="#858FA4"
              class="modal-cart-goods-item-button__svg tab-goods-item-button__path" data-index="${id}"
            />
          </svg>
        </button>
    `;
    cart.append(cartElem);
  });
};

const renderCartFooter = () => {
  const modalCart = document.querySelector(".modal-cart");
  const cartFooter = modalCart.querySelector(".modal-cart-footer");
  const message = modalCart.querySelector(".modal-cart__message");

  const getSum = () => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    const sum = cartArray.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    return sum;
  };

  const resetCart = () => {
    setTimeout(() => {
      modalCart.classList.remove(modal_active);
    }, 7000);
    message.innerHTML =
      "На данный момент страница оформления заказа находится в разработке. Для оформления заказа позвоните по телефону вашего региона или закажите звонок на сайте.";
    cartFooter.style.display = "none";
    message.classList.remove(hide);
  };

  const renderFooter = () => {
    cartFooter.style.display = "flex";
    cartFooter.innerHTML = "";
    cartFooter.innerHTML = `
      <a class="tab-footer__button button button_full-red" href="#">Оформить заказ</a>
      <div class="tab-footer-price">Итого <span class="tab-footer-price__sum">${getSum()} ₽</span></div>
    `;

    const buttonSend = modalCart.querySelector(".tab-footer__button");
    buttonSend.addEventListener("click", (e) => {
      e.preventDefault();
      resetCart();
    });
  };

  renderFooter();
};

const addToCart = (cartItem) => {
  const positionsArray = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  if (positionsArray.some((item) => item.id === cartItem.id)) {
    positionsArray.map((item) => {
      if (item.id === cartItem.id) {
        item.count++;
      }
      return item;
    });
  } else {
    positionsArray.push(cartItem);
  }

  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(positionsArray));
};

const addToTabs = (tabItem, localStorageItem) => {
  const positionsArray = localStorage.getItem(localStorageItem)
    ? JSON.parse(localStorage.getItem(localStorageItem))
    : [];

  if (!positionsArray.some((item) => item.id === tabItem.id)) {
    positionsArray.push(tabItem);
  }

  localStorage.removeItem(localStorageItem);
  localStorage.setItem(localStorageItem, JSON.stringify(positionsArray));
};

const renderTabsItems = (data, block) => {
  const hide = "hide";

  const items = block.querySelector(".tab-goods");
  const message = block.querySelector(".tab__message");

  items.innerHTML = "";

  data.forEach(({ name, price, id, img }) => {
    message.classList.add(hide);
    const element = document.createElement("div");
    element.classList.add("tab-goods-item");
    element.innerHTML = `
    <img src="./images/db/${img}" class="tab-goods-item__img" alt="${name}" />
    <div class="tab-goods-item__name">${name}</div>
    <div class="tab-goods-item__price">${price} ₽</div>
    <button class="tab-goods-item-button button button_unbordered data-index="${id}">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg" class="tab-goods-item-button__svg" data-index="${id}"
      >
        <path
          d="M7.72959 1.57572L5.30563 3.99992L7.72959 6.42402C8.09014 6.78471 8.09014 7.36897 7.72959 7.72966C7.54944 7.90981 7.31325 7.99996 7.07718 7.99996C6.84071 7.99996 6.6045 7.90995 6.42449 7.72966L4.00001 5.30529L1.57571 7.72964C1.39559 7.90979 1.15938 7.99993 0.923098 7.99993C0.686888 7.99993 0.450838 7.90993 0.270551 7.72964C-0.09 7.36911 -0.09 6.78482 0.270551 6.424L2.69444 3.9999L0.270413 1.57572C-0.0901378 1.21516 -0.0901378 0.630758 0.270413 0.270207C0.630895 -0.090069 1.21496 -0.090069 1.57558 0.270207L3.99999 2.69442L6.42422 0.270207C6.78491 -0.090069 7.36904 -0.090069 7.72945 0.270207C8.09014 0.630758 8.09014 1.21516 7.72959 1.57572Z"
          fill="#858FA4"
          class="tab-goods-item-button__path" data-index="${id}"
        />
      </svg>
    </button>
    `;
    items.append(element);
  });
};

const discount = () => {
  const active_btn = "discount-heading-buttons__item_active";
  const discountBlock = document.querySelector(".discount-cards");
  const filterBtns = document.querySelectorAll(
    ".discount-heading-buttons__item"
  );
  const openCartBtn = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const numberInCart = openCartBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const openFavoriteBtn = document.querySelector(
    ".header-navigation-buttons-item_favorite"
  );
  const numberInFavorite = openFavoriteBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const modalFavorite = document.querySelector(".modal-favorite");
  const favoriteFooter = modalFavorite.querySelector(".modal-favorite-footer");
  const modalComparison = document.querySelector(".modal-comparison");
  const comparisonFooter = modalComparison.querySelector(
    ".modal-comparison-footer"
  );
  const openComparisonBtn = document.querySelector(
    ".header-navigation-buttons-item_comparison"
  );
  const numberInComparison = openComparisonBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );

  const renderBlock = (data) => {
    const renderCard = (
      block,
      id,
      discount,
      choice,
      neww,
      img,
      availibile,
      name,
      raiting,
      price,
      discountprice,
      href
    ) => {
      let inFavorite = false;
      let inCart = false;
      let inComparison = false;

      const storageArray = (...args) => {
        args.forEach((arg) => {
          const array = JSON.parse(localStorage.getItem(arg))
            ? JSON.parse(localStorage.getItem(arg))
            : [];

          array.map((item) => {
            if (item.id === id) {
              if (arg === "favorite") {
                inFavorite = true;
              } else if (arg === "cart") {
                inCart = true;
              } else if (arg === "comparison") {
                inComparison = true;
              }
            }
          });
        });
      };

      storageArray("favorite", "cart", "comparison");

      const div = document.createElement("div");
      div.classList.add("discount-cards-item", "good-card");

      div.innerHTML = `
        <div class="good-card-icons">
          <div class="good-card-icons-left">
            ${
              discount
                ? "<div class='good-card-icons-item good-card-icons-item_red'><img class='good-card-icons-item__img good-card-icons-item__img_discount' src='./images/discount.svg' alt='discount'/></div>"
                : ""
            }
           ${
             choice
               ? ' <div class="good-card-icons-item good-card-icons-item_blue"><img class="good-card-icons-item__img good-card-icons-item__img_choice" src="./images/choice.svg" alt="choice"/></div>'
               : ""
           }
            ${
              neww
                ? '<div class="good-card-icons-item good-card-icons-item_green"><img class="good-card-icons-item__img good-card-icons-item__img_new" src="./images/new.svg"alt="new"/></div>'
                : ""
            }
          </div>
          <div class="good-card-icons-right">
            <button
              class="
                good-card-icons-item good-card-icons-item_comparison
                button
              " data-index="${id}"
            >
            ${
              inComparison
                ? `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`
                : `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#858FA4" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`
            }
            </button>
            <button
              class="good-card-icons-item good-card-icons-item_favorite button" data-index="${id}"
            >${
              inFavorite
                ? `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/></svg>`
                : `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M18.757 1.66341C16.5388 -0.55417 12.9303 -0.55417 10.7127 1.66341L10.1976 2.17818L9.68282 1.66341C7.46524 -0.55447 3.85642 -0.55447 1.63884 1.66341C-0.533711 3.83597 -0.547819 7.2797 1.60613 9.67407C3.57067 11.8571 9.36465 16.5735 9.61049 16.7731C9.77737 16.9088 9.97818 16.9749 10.1778 16.9749C10.1844 16.9749 10.191 16.9749 10.1973 16.9746C10.4038 16.9842 10.6118 16.9133 10.7841 16.7731C11.0299 16.5735 16.8245 11.8571 18.7897 9.67377C20.9433 7.2797 20.9292 3.83597 18.757 1.66341ZM17.451 8.46923C15.9192 10.1708 11.7089 13.6803 10.1973 14.9257C8.68569 13.6806 4.47625 10.1714 2.94484 8.46953C1.44224 6.79944 1.42813 4.42098 2.91212 2.93699C3.67002 2.17938 4.66535 1.80028 5.66068 1.80028C6.65601 1.80028 7.65134 2.17908 8.40925 2.93699L9.54145 4.06919C9.67622 4.20396 9.84611 4.2844 10.0244 4.31262C10.3138 4.37475 10.6277 4.29401 10.8528 4.06949L11.9856 2.93699C13.5018 1.42148 15.9679 1.42178 17.4831 2.93699C18.9671 4.42098 18.953 6.79944 17.451 8.46923Z" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_favorite" data-index="${id}"/></svg>`
            }
              
            </button>
          </div>
        </div>
        <img src="./images/db/${img}" alt=${name} class="good-card__image good-card__link" data-href="${href}" />
        <div class="good-card-description">
          <div class="good-card-availibility">
          ${
            availibile
              ? '<span class="good-card-availibility good-card-availibility_available">В наличии</span><span class="good-card-availibility_blue">Есть в шоу-руме</span>'
              : '<span class="good-card-availibility good-card-availibility_not-available">Нет в наличии</span>'
          }
            
          </div>
          <h4 class="good-card__heading good-card__link" data-href=${href}>${name}</h4>
          <div class="good-card-rating">Рейтинг ${'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0.5L7.91148 3.86908L11.7063 4.6459L9.09284 7.50492L9.52671 11.3541L6 9.752L2.47329 11.3541L2.90716 7.50492L0.293661 4.6459L4.08852 3.86908L6 0.5Z" fill="#F99808"/></svg>'.repeat(
            Math.round(raiting)
          )}</div>
          <div class="good-card-bottom">
            <div class="good-card-price">
              <div class="good-card-price__item">${
                discount ? discountprice : price
              } ₽</div>
              <div class="good-card-price__item_crossed">${
                discount ? price : ""
              } ₽</div>
            </div>
            ${
              availibile
                ? ` <button class="good-card__button button button_catalog button_buy" data-index="${id}">${
                    inCart ? "&#10004; В корзине" : "Купить"
                  }</button>`
                : ""
            }
          </div>
        </div>
        `;

      const linksToGood = div.querySelectorAll(".good-card__link");
      linksToGood.forEach((link) => {
        link.addEventListener("click", () => {
          window.location.href = link.dataset.href;
        });
      });

      block.append(div);

      const addToCartBtn = div.querySelector(".good-card__button");

      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", (e) => {
          const cartItem = {
            name,
            price: discountprice,
            id,
            img,
            count: 1,
          };

          addToCart(cartItem);

          numberInCart.innerHTML = JSON.parse(
            localStorage.getItem("cart")
          ).length;
          renderCartItems(JSON.parse(localStorage.getItem("cart")));
          renderCartFooter();
          e.target.innerHTML = `&#10004; В корзине`;
        });
      }

      const createTabItem = (
        localStorageItem,
        countBlock,
        modal,
        blockFooter
      ) => {
        const tabItem = {
          name,
          price: discountprice,
          id,
          img,
        };

        addToTabs(tabItem, localStorageItem);
        const cartArray = JSON.parse(localStorage.getItem(localStorageItem))
          ? JSON.parse(localStorage.getItem(localStorageItem))
          : [];
        countBlock.innerHTML = cartArray.length;
        renderTabsItems(cartArray, modal);
        blockFooter.style.display = "flex";
      };

      const addToFavoriteBtn = div.querySelector(
        ".good-card-icons-item_favorite"
      );
      addToFavoriteBtn.addEventListener("click", (e) => {
        createTabItem(
          "favorite",
          numberInFavorite,
          modalFavorite,
          favoriteFooter
        );
        if (e.target.classList.contains("good-card-icons-item")) {
          e.target.innerHTML = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/> </svg>`;
        } else {
          e.target.innerHTML = `
          <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/>
          `;
        }
      });

      const addToComparisonBtn = div.querySelector(
        ".good-card-icons-item_comparison"
      );
      addToComparisonBtn.addEventListener("click", (e) => {
        createTabItem(
          "comparison",
          numberInComparison,
          modalComparison,
          comparisonFooter
        );
        if (e.target.classList.contains("good-card-icons-item")) {
          e.target.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`;
        } else {
          e.target.innerHTML = `<rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/>`;
        }
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => (discountBlock.innerHTML = ""));
    });

    data.forEach((item) => {
      const {
        id,
        img,
        name,
        keywords,
        description,
        price,
        discountPrice,
        category,
        subcategory,
        cities,
        href,
        discount,
        choice,
        neww,
        availibility,
        raiting,
      } = item;

      if (discount) {
        renderCard(
          discountBlock,
          id,
          discount,
          choice,
          neww,
          img,
          availibility,
          name,
          raiting,
          price,
          discountPrice,
          href
        );

        filterBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            filterBtns.forEach((btn) => btn.classList.remove(active_btn));
            if (btn.dataset.filter === "new") {
              btn.classList.add(active_btn);
              if (discount && neww) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
            if (btn.dataset.filter === "recommendation") {
              btn.classList.add(active_btn);
              if (discount && choice) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
            if (btn.dataset.filter === "all") {
              btn.classList.add(active_btn);
              if (discount) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
          });
        });
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/goods.json"
  )
    .then((res) => res.json())
    .then((res) => renderBlock(res));
};

discount();

const sliderCommon = (slidesWrapper, prevBtn, nextBtn, elNumber) => {
  const hide = "hide";

  let count = 0;
  let width = 400;

  if (screen.width < 430) {
    if (elNumber === 10) {
      width = screen.width / 2 + 25;
    } else {
      width = screen.width / 2 + 40;
    }
  } else if (screen.width < 960) {
    width = screen.width / 2 - 50;
  } else if (screen.width < 1280) {
    width = 300;
  }

  const rollSlider = (count) => {
    slidesWrapper.style.transform = `translate(-${count * width}px)`;
  };

  nextBtn.addEventListener("click", () => {
    count++;
    if (elNumber === 6) {
      if (
        (screen.width > 970 && count === 2) ||
        (screen.width > 559 && screen.width < 970 && count === 3) ||
        (screen.width <= 559 && count === 6)
      ) {
        nextBtn.classList.add(hide);
      }

      if (
        (screen.width > 970 && count === 3) ||
        (screen.width > 559 && screen.width < 970 && count === 4) ||
        (screen.width <= 559 && count === 7)
      ) {
        count = 0;
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count === 5) ||
        (screen.width > 970 && screen.width < 1300 && count === 7)
      ) {
        nextBtn.classList.add(hide);
      }

      if (
        (screen.width > 1300 && count === 6) ||
        (screen.width > 970 && screen.width < 1300 && count === 8)
      ) {
        count = 0;
      }
    }

    rollSlider(count);
    if (count > 0) {
      prevBtn.classList.remove(hide);
    }
  });

  prevBtn.addEventListener("click", () => {
    count--;

    rollSlider(count);
    if (count === 0) {
      prevBtn.classList.add("hide");
    }

    if (elNumber === 6) {
      if (screen.width > 970 && count < 2) {
        nextBtn.classList.remove(hide);
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count < 5) ||
        (screen.width > 970 && screen.width < 1300 && count < 7)
      ) {
        nextBtn.classList.remove(hide);
      }
    }
  });

  let x1 = null;
  let y1 = null;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  };

  const handleTouchMove = (event) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        count--;
        if (count <= 0) {
          count = 0;
        }
      } else {
        count++;
        if (elNumber === 6) {
          if (
            (screen.width > 970 && count === 3) ||
            (screen.width > 559 && screen.width < 970 && count === 4) ||
            (screen.width <= 559 && count === 7)
          ) {
            count = 0;
          }
        } else if (elNumber === 10) {
          if (
            (screen.width > 1300 && count === 6) ||
            (screen.width > 970 && screen.width < 1300 && count === 8) ||
            (screen.width > 559 && screen.width < 970 && count === 6) ||
            (screen.width <= 559 && count === 11) ||
            (screen.width === 320 && count === 12)
          ) {
            count = 0;
          }
        }
      }
      rollSlider(count);
    }
    x1 = null;
    y1 = null;

    return;
  };

  slidesWrapper.addEventListener("touchstart", handleTouchStart, false);
  slidesWrapper.addEventListener("touchmove", handleTouchMove, false);
};

const sliderDiscount = () => {
  const slidesWrapper = document.querySelector(".discount-cards");
  const prevBtn = document.querySelector(".discount-controls__item_prev");
  const nextBtn = document.querySelector(".discount-controls__item_next");
  sliderCommon(slidesWrapper, prevBtn, nextBtn, 10);
};

sliderDiscount();

const sliderNews = () => {
  const slidesWrapper = document.querySelector(".news-cards");
  const prevBtn = document.querySelector(".news-controls__item_prev");
  const nextBtn = document.querySelector(".news-controls__item_next");
  sliderCommon(slidesWrapper, prevBtn, nextBtn, 6);
};

sliderNews();

const fillCart = () => {
  const hide = "hide";
  const modalCart = document.querySelector(".modal-cart");
  const cart = modalCart.querySelector(".tab-goods");
  const cartFooter = modalCart.querySelector(".modal-cart-footer");
  const openCartBtn = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const numberInCart = openCartBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const message = modalCart.querySelector(".modal-cart__message");

  const emptyCart = () => {
    cartFooter.style.display = "none";
    message.innerHTML = "Корзина пуста";
    message.classList.remove(hide);
  };

  const changeBuyButton = (id) => {
    const buttons = document.querySelectorAll(".good-card__button");
    buttons.forEach((button) => {
      if (button.dataset.index === id) {
        button.innerHTML = `Купить`;
      }
    });
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderCartItems(JSON.parse(localStorage.getItem("cart")));
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    cartArray.map((item, index) => {
      if (item.id === id) {
        item.count--;
        if (item.count === 0) {
          cartArray.splice(index, 1);
          numberInCart.innerHTML = cartArray.length;
          changeBuyButton(id);
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderCartItems(JSON.parse(localStorage.getItem("cart")));
  };

  const deleteItem = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    cartArray.map((item, index) => {
      if (item.id === id) {
        cartArray.splice(index, 1);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(cartArray));
        numberInCart.innerHTML = cartArray.length;
        changeBuyButton(id);
      }
    });

    renderCartItems(JSON.parse(localStorage.getItem("cart")));
  };

  cart.addEventListener("click", (e) => {
    e.preventDefault();
    const cartArray = JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cartArray.length === 0) {
      emptyCart();
    }
    if (e.target.classList.contains("tab-goods-item-count-buttons__item_dec")) {
      decrementCount(e.target.dataset.index);
      renderCartFooter();
    } else if (
      e.target.classList.contains("tab-goods-item-count-buttons__item_inc")
    ) {
      incrementCount(e.target.dataset.index);
      renderCartFooter();
    } else if (
      e.target.classList.contains("tab-goods-item-button") ||
      e.target.classList.contains("tab-goods-item-button__svg") ||
      e.target.classList.contains("tab-goods-item-button__path")
    ) {
      deleteItem(e.target.dataset.index);
      renderCartFooter();
      const cartArray = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      if (cartArray.length === 0) {
        emptyCart();
      }
    }
  });

  if (JSON.parse(localStorage.getItem("cart"))) {
    renderCartItems(JSON.parse(localStorage.getItem("cart")));
    if (JSON.parse(localStorage.getItem("cart")).length > 0) {
      renderCartFooter();
    }
  }

  numberInCart.innerHTML = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).length
    : 0;
};

fillCart();

const fillTabs = (modal, localStorageItem, tabMessage) => {
  const hide = "hide";
  const modalFooter = modal.querySelector(".tab-footer");
  const openCartBtn = document.querySelector(
    ".header-navigation-buttons-item_" + localStorageItem
  );
  const numberInTab = openCartBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const message = modal.querySelector(".tab__message ");

  const cartArray = JSON.parse(localStorage.getItem(localStorageItem))
    ? JSON.parse(localStorage.getItem(localStorageItem))
    : [];
  if (cartArray.length > 0) {
    modalFooter.style.display = "flex";
  }

  const emptyBlock = () => {
    modalFooter.style.display = "none";
    message.innerHTML = tabMessage;
    message.classList.remove(hide);
  };

  const changeButton = (id) => {
    const buttons = document.querySelectorAll(
      ".good-card-icons-item_" + localStorageItem
    );
    buttons.forEach((button) => {
      if (button.dataset.index === id) {
        if (localStorageItem === "favorite") {
          button.innerHTML = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M18.757 1.66341C16.5388 -0.55417 12.9303 -0.55417 10.7127 1.66341L10.1976 2.17818L9.68282 1.66341C7.46524 -0.55447 3.85642 -0.55447 1.63884 1.66341C-0.533711 3.83597 -0.547819 7.2797 1.60613 9.67407C3.57067 11.8571 9.36465 16.5735 9.61049 16.7731C9.77737 16.9088 9.97818 16.9749 10.1778 16.9749C10.1844 16.9749 10.191 16.9749 10.1973 16.9746C10.4038 16.9842 10.6118 16.9133 10.7841 16.7731C11.0299 16.5735 16.8245 11.8571 18.7897 9.67377C20.9433 7.2797 20.9292 3.83597 18.757 1.66341ZM17.451 8.46923C15.9192 10.1708 11.7089 13.6803 10.1973 14.9257C8.68569 13.6806 4.47625 10.1714 2.94484 8.46953C1.44224 6.79944 1.42813 4.42098 2.91212 2.93699C3.67002 2.17938 4.66535 1.80028 5.66068 1.80028C6.65601 1.80028 7.65134 2.17908 8.40925 2.93699L9.54145 4.06919C9.67622 4.20396 9.84611 4.2844 10.0244 4.31262C10.3138 4.37475 10.6277 4.29401 10.8528 4.06949L11.9856 2.93699C13.5018 1.42148 15.9679 1.42178 17.4831 2.93699C18.9671 4.42098 18.953 6.79944 17.451 8.46923Z" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_favorite" data-index="${id}"/></svg>`;
        } else if (localStorageItem === "comparison") {
          button.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#858FA4" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`;
        }
      }
    });
  };

  const deleteItem = (id) => {
    const storageArray = JSON.parse(localStorage.getItem(localStorageItem));
    storageArray.map((item, index) => {
      if (item.id === id) {
        storageArray.splice(index, 1);
        localStorage.removeItem(localStorageItem);
        localStorage.setItem(localStorageItem, JSON.stringify(storageArray));
        numberInTab.innerHTML = storageArray.length;
        changeButton(id);
      }
    });
    renderTabsItems(JSON.parse(localStorage.getItem(localStorageItem)), modal);
  };

  modal.addEventListener("click", (e) => {
    const cartArray = JSON.parse(localStorage.getItem(localStorageItem))
      ? JSON.parse(localStorage.getItem(localStorageItem))
      : [];
    if (cartArray.length === 0) {
      emptyBlock();
    }
    if (
      e.target.classList.contains("tab-goods-item-button") ||
      e.target.classList.contains("tab-goods-item-button__svg") ||
      e.target.classList.contains("tab-goods-item-button__path")
    ) {
      deleteItem(e.target.dataset.index);
      const cartArray = JSON.parse(localStorage.getItem(localStorageItem))
        ? JSON.parse(localStorage.getItem(localStorageItem))
        : [];
      if (cartArray.length === 0) {
        emptyBlock();
      }
    }
  });

  if (JSON.parse(localStorage.getItem(localStorageItem))) {
    renderTabsItems(JSON.parse(localStorage.getItem(localStorageItem)), modal);
  }

  numberInTab.innerHTML = JSON.parse(localStorage.getItem(localStorageItem))
    ? JSON.parse(localStorage.getItem(localStorageItem)).length
    : 0;
};

fillTabs(
  document.querySelector(".modal-favorite"),
  "favorite",
  "В избранных пока ничего нет..."
);
fillTabs(
  document.querySelector(".modal-comparison"),
  "comparison",
  "Для сравнения пока ничего нет..."
);

