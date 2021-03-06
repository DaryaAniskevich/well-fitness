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
