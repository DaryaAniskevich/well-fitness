const modal = (modal, openBtn, closeBtn) => {
  const modal_active = "modal_active";

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add(modal_active);
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
  const modal_active = "modal_active";

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
      cityModal.classList.remove(modal_active);
      inputCity.value = "";
    }
  });
};

chooseCity();

const phoneModal = () => {
  const HIDE = "hide";
  const choosePhoneBtn = document.querySelector(".header-phone-choosen");
  const allPhonesBlock = document.querySelector(".header-phone-open");
  const selectedPhone = document.querySelectorAll(".header-phone-open__item");

  choosePhoneBtn.addEventListener("click", () => {
    allPhonesBlock.classList.remove(HIDE);
  });

  selectedPhone.forEach((item) => {
    item.addEventListener("click", () => {
      allPhonesBlock.classList.add(HIDE);
      choosePhoneBtn.querySelector(
        ".header-phone-choosen__item"
      ).innerHTML = `<span class="header-phone-choosen__item_white">${item.children[0].dataset.phone}</span> ${item.children[1].dataset.city}`;
    });
  });
};

phoneModal();

const callRequest = () => {
  const RED = "#f53b49";
  const GRAY = `rgba(144,156,181,.5)`;
  const HIDE = "hide";
  const modal_active = "modal_active";

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

  modal(modalCall, openBtn, closeBtn);

  let nameIsValid = true;
  let phoneIsValid = true;

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

      errorMessage.classList.remove(HIDE);
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = GRAY;
      errorMessage.classList.add(HIDE);
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
          errorMessage.classList.add(HIDE);
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
      successMessage.classList.remove(HIDE);
      setTimeout(() => {
        modalCall.classList.remove(modal_active);
        successMessage.classList.add(HIDE);
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callRequest();

const catalogModal = () => {
  const hide = "hide";
  const modal_active = "modal_active";
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
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      searchBlock.classList.remove(modal_active);
    }
  });

  window.addEventListener("scroll", () => {
    if (
      searchBlock.classList.contains(modal_active) &&
      pageYOffset > searchBlock.offsetHeight - 50
    ) {
      searchBlock.classList.remove(modal_active);
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
          e.target.classList.contains(modal_active) ||
          e.target.classList.contains("modal-wrapper")
        ) {
          modal.classList.remove(modal_active);
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

const sign = () => {
  const RED = "#f53b49";
  const GRAY = "rgba(144,156,181,.3)";
  const HIDE = "hide";

  const openBtn = document.querySelectorAll(".sign-block__button");
  const signModal = document.querySelector(".sign");
  const closeBtn = signModal.querySelector(".modal-button");

  const signInBlock = signModal.querySelector(".sign-in");
  const signInBtn = signModal.querySelector(".sign-form__button_signin");
  const showRetoreBlockBtn = signModal.querySelector(
    ".sign-form__button_password"
  );
  const restorePassworBlock = signModal.querySelector(".restore-password");
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

  modal(signModal, openBtn, closeBtn);

  const cleanInputs = (...inputs) => {
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = GRAY;
    });
  };
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      cleanInputs(email, emailRestore, password);

      errorMessage.classList.add(HIDE);
      if (signInBlock.classList.contains(HIDE)) {
        signInBlock.classList.remove(HIDE);
        restorePassworBlock.classList.add(HIDE);
      }
    });
  });

  showRetoreBlockBtn.addEventListener("click", (e) => {
    e.preventDefault();
    restorePassworBlock.classList.remove(HIDE);
    signInBlock.classList.add(HIDE);
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
    errorMessage.classList.remove(HIDE);
  });

  restorePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(emailRestore.value)) {
      emailRestore.style.borderColor = RED;
    }
    errorMessage.classList.remove(HIDE);
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

  brandsButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      brandsButtons.forEach((button) => {
        button.classList.remove("brands-buttons__item_active");
      });
      brandsBlock.innerHTML = "";
      button.classList.add("brands-buttons__item_active");
      category = button.dataset.brand;
      getData(category);
    });
  });

  getData("all");
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

        div.innerHTML = `<img src="./images/db/${img}" alt="${title}" class="news-card__img" />
    <div class="news-card-content">
      <h4 class="news-card__heading">
        ${title}
      </h4>
      <p class="news-card__paragraf">
        ${description}
      </p>
      <p class="news-card__paragraf news-card__paragraf_light">
        ${date}
      </p>
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
      categoryBlock.innerHTML += `<div
        class="
          modal-catalog-category-name__item
        " data-category="${category}"
      >
        ${category}
        <span class="modal-catalog-category-name__item_arrow">
          &#8594;</span
        >
      </div>`;

      block.append(categoryBlock);
    });
  };

  const renderSubcategories = (block, subcategory, href, img) => {
    block.innerHTML += `
      <div class="modal-catalog-category-subcategory-item" data-href=${href}>
        <img
          src="./images/db/${img}"
          alt="${subcategory}"
          class="modal-catalog-category-subcategory-item__img"
        />
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

const discount = () => {
  const active_btn = "discount-heading-buttons__item_active";
  const discountBlock = document.querySelector(".discount-cards");
  const filterBtns = document.querySelectorAll(
    ".discount-heading-buttons__item"
  );

  const renderBlock = (data) => {
    const renderCard = (
      block,
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
              "
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="5"
                  width="2"
                  height="17"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="10"
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="15"
                  y="4"
                  width="2"
                  height="13"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
              </svg>
            </button>
            <button
              class="good-card-icons-item good-card-icons-item_favorite button"
            >
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.757 1.66341C16.5388 -0.55417 12.9303 -0.55417 10.7127 1.66341L10.1976 2.17818L9.68282 1.66341C7.46524 -0.55447 3.85642 -0.55447 1.63884 1.66341C-0.533711 3.83597 -0.547819 7.2797 1.60613 9.67407C3.57067 11.8571 9.36465 16.5735 9.61049 16.7731C9.77737 16.9088 9.97818 16.9749 10.1778 16.9749C10.1844 16.9749 10.191 16.9749 10.1973 16.9746C10.4038 16.9842 10.6118 16.9133 10.7841 16.7731C11.0299 16.5735 16.8245 11.8571 18.7897 9.67377C20.9433 7.2797 20.9292 3.83597 18.757 1.66341ZM17.451 8.46923C15.9192 10.1708 11.7089 13.6803 10.1973 14.9257C8.68569 13.6806 4.47625 10.1714 2.94484 8.46953C1.44224 6.79944 1.42813 4.42098 2.91212 2.93699C3.67002 2.17938 4.66535 1.80028 5.66068 1.80028C6.65601 1.80028 7.65134 2.17908 8.40925 2.93699L9.54145 4.06919C9.67622 4.20396 9.84611 4.2844 10.0244 4.31262C10.3138 4.37475 10.6277 4.29401 10.8528 4.06949L11.9856 2.93699C13.5018 1.42148 15.9679 1.42178 17.4831 2.93699C18.9671 4.42098 18.953 6.79944 17.451 8.46923Z"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img good-card-icons-item__img_favorite
                  "
                />
              </svg>
            </button>
          </div>
        </div>
        <img src="./images/db/${img}" alt=${name} class="good-card__image" />
        <div class="good-card-description">
          <div class="good-card-availibility">
          ${
            availibile
              ? '<span class="good-card-availibility good-card-availibility_available">В наличии</span><span class="good-card-availibility_blue">Есть в шоу-руме</span>'
              : '<span class="good-card-availibility good-card-availibility_not-available">Нет в наличии</span>'
          }
            
          </div>
          <h4 class="good-card__heading">${name}</h4>
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
            <button class="good-card__button button button_catalog button_buy">
              Купить
            </button>
          </div>
        </div>
        `;

      div.setAttribute("data-href", href);
      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });
      block.append(div);
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => (discountBlock.innerHTML = ""));
    });

    data.forEach((item, index) => {
      const {
        id,
        img,
        name,
        label,
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

      if (discountBlock.childNodes.length < 10) {
        if (discount) {
          renderCard(
            discountBlock,
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
        (screen.width > 970 && screen.width < 1300 && count === 7) ||
        (screen.width > 559 && screen.width < 970 && count === 5) ||
        (screen.width <= 559 && count === 10) ||
        (screen.width === 320 && count === 11)
      ) {
        nextBtn.classList.add(hide);
      }

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
      if (
        (screen.width > 970 && count < 2) ||
        (screen.width > 559 && screen.width < 970 && count < 3) ||
        (screen.width <= 559 && count < 7)
      ) {
        nextBtn.classList.remove(hide);
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count === 6) ||
        (screen.width > 970 && screen.width < 1300 && count < 7) ||
        (screen.width > 559 && screen.width < 970 && count < 6) ||
        (screen.width <= 559 && count < 11) ||
        (screen.width === 320 && count === 12)
      ) {
        nextBtn.classList.remove(hide);
      }
    }
  });
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

