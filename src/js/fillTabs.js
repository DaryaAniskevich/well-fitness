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
