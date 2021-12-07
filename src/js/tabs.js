const tabs = () => {
  const modal_active = "modal_active";

  const openCart = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const openCartSvg = document.querySelector(
    ".header-navigation-buttons-item__img_cart"
  );
  const cart = document.querySelector(".modal-cart");

  const openComparison = document.querySelector(
    ".header-navigation-buttons-item_comparison"
  );
  const openComparisonSvg = document.querySelector(
    ".header-navigation-buttons-item__img_comparison"
  );
  const comparison = document.querySelector(".modal-comparison");

  const openFavorite = document.querySelector(
    ".header-navigation-buttons-item_favorite"
  );
  const openFavoriteSvg = document.querySelector(
    ".header-navigation-buttons-item__img_favorite"
  );
  const favorite = document.querySelector(".modal-favorite");

  openCart.addEventListener("click", () => {
    openCartSvg.classList.toggle("header-navigation-buttons-item__img_active");
    cart.classList.toggle(modal_active);
  });

  openComparison.addEventListener("click", () => {
    openComparisonSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    comparison.classList.toggle(modal_active);
  });

  openFavorite.addEventListener("click", () => {
    openFavoriteSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    favorite.classList.toggle(modal_active);
  });

  const closeModal = (...args) => {
    args.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("modal_active") ||
          e.target.classList.contains("modal-wrapper")
        ) {
          modal.classList.remove("modal_active");
          document
            .querySelectorAll(".header-navigation-buttons-item__img_active")
            .forEach((button) => {
              button.classList.remove(
                "header-navigation-buttons-item__img_active"
              );
            });
        }
      });
    });
  };
  closeModal(favorite, cart, comparison);
};

tabs();
