const chooseCity = () => {
  const modal_active = "modal_active";
  const hide = "hide";

  const cityOpenBtn = document.querySelectorAll(".city-btn");
  const cityModal = document.querySelector(".modal-city");
  const cityCloseBtn = cityModal.querySelector(".modal-city-content-button");
  const searchCityBtn = cityModal.querySelector(
    ".modal-city-content-form-button"
  );
  const inputCity = cityModal.querySelector(".modal-city-content-form__input");
  const choosenCityName = document.querySelector(".header-city__item");
  const message = cityModal.querySelector(".modal-city-content__text_message");
  const cityInMessage = message.querySelector(".modal-city-content__text_city");
  const callButton = cityModal.querySelector(".callBack-btn");

  const clearModal = () => {
    inputCity.value = "";
    message.classList.add(hide);
  };

  constSeacrhCity = (data) => {
    searchCityBtn.addEventListener("click", (e) => {
      e.preventDefault();
      message.classList.add(hide);
      const newArray = data.map((item) => item.toLowerCase());
      if (newArray.includes(inputCity.value.toLowerCase())) {
        choosenCityName.textContent = inputCity.value;
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
    .then((res) => constSeacrhCity(res));
};

chooseCity();
