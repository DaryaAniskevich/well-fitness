const cart = () => {
  const openBtn = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const cart = document.querySelector(".modal-cart");
  const body = document.querySelector("body");

  openBtn.addEventListener("click", () => {
    cart.classList.toggle("hide");
  });

  body.addEventListener("click", (e) => {
    if (!e.target.className.includes("cart")) {
      cart.classList.add("hide");
    }
  });
};

cart();
