const renderCartFooter = () => {
  const hide = "hide";
  const modal_active = "modal_active";

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
      <a class="tab-footer__button button button_full-red" href="#">
        Оформить заказ
      </a>
      <div class="tab-footer-price">
        Итого <span class="tab-footer-price__sum">${getSum()} ₽</span>
      </div>
    `;

    const buttonSend = modalCart.querySelector(".tab-footer__button");
    buttonSend.addEventListener("click", (e) => {
      e.preventDefault();
      resetCart();
    });
  };
  renderFooter();
};
