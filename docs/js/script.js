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
  const openBtn = document.querySelector(".header-navigation-catalog__button");
  const catalogBlock = document.querySelector(".catalog");
  const body = document.querySelector("body");
  const searchBlock = document.querySelector(".search");

  openBtn.addEventListener("click", () => {
    searchBlock.classList.add("hide");
    catalogBlock.classList.toggle("hide");
  });

  body.addEventListener("click", (e) => {
    if (!e.target.className.includes("catalog")) {
      catalogBlock.classList.add("hide");
    }
  });
};

catalog();

const search = () => {
  const openBtn = document.querySelectorAll(".search-btn");
  const searchBlock = document.querySelector(".search");
  const closeBtn = searchBlock.querySelector(".search-form-button");
  const body = document.querySelector("body");
  const catalogBlock = document.querySelector(".catalog");

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      catalogBlock.classList.add("hide");
      searchBlock.classList.remove("hide");
    });
  });
  closeBtn.addEventListener("click", () => {
    searchBlock.classList.add("hide");
  });

  body.addEventListener("click", (e) => {
    if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
      if (!e.target.className.includes("search")) {
        searchBlock.classList.add("hide");
      }
    }
  });
};

search();

const cart = () => {
  const openBtn = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const openBtnSvg = document.querySelector(
    ".header-navigation-buttons-item__img_cart"
  );
  const cart = document.querySelector(".modal-cart");
  const body = document.querySelector("body");

  openBtn.addEventListener("click", () => {
    openBtnSvg.classList.toggle("header-navigation-buttons-item__img_active");
    cart.classList.toggle("hide");
  });

  body.addEventListener("click", (e) => {
    if (!e.target.className.includes("cart")) {
      openBtnSvg.classList.remove("header-navigation-buttons-item__img_active");
      cart.classList.add("hide");
    }
  });
};

cart();
