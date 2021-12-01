const chooseCity = () => {
  const cityOpenBtn = document.querySelector(".header-city");
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
