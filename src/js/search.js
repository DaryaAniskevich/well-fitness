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
