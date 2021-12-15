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

    renderCartFooter();
  }

  numberInCart.innerHTML = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).length
    : 0;
};

fillCart();
