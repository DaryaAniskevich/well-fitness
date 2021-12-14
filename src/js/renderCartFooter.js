const renderCartFooter = () => {
  const modalCart = document.querySelector(".modal-cart");
  const cartFooter = modalCart.querySelector(".cart-footer");

  const getSum = () => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    const sum = cartArray.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    return sum;
  };
  const renderFooter = () => {
    cartFooter.style.display = "flex";
    cartFooter.innerHTML = "";
    cartFooter.innerHTML = `
    <button class="tab-footer__button button button_full-red">
          Оформить заказ
        </button>
        <div class="tab-footer-price">
          Итого <span class="tab-footer-price__sum">${getSum()} ₽</span>
      </div>
    `;

    const buttonSend = modalCart.querySelector(".tab-footer__button");
    buttonSend.addEventListener("click", () => {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        data: localStorage.getItem("cart"),
      })
        .then((response) => {
          if (response.ok) {
            resetCart();
          }
        })
        .catch((e) => console.error(e));
    });
  };
  renderFooter();
};
