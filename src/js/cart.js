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
