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
