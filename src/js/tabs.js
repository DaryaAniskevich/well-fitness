const tabs = () => {
  const button_active = "header-navigation-buttons-item__img_active";

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

  const openModal = (modal, btn) => {
    btn.classList.toggle(button_active);
    modal.classList.toggle(hide);
  };

  const closeModal = (modal, btn) => {
    modal.classList.add(hide);
    btn.classList.remove(button_active);
  };

  openCart.addEventListener("click", () => {
    if (!favorite.classList.contains(hide)) {
      closeModal(favorite, openFavoriteSvg);
    }
    if (!comparison.classList.contains(hide)) {
      closeModal(comparison, openComparisonSvg);
    }
    openModal(cart, openCartSvg);
  });

  openComparison.addEventListener("click", () => {
    if (!favorite.classList.contains(hide)) {
      closeModal(favorite, openFavoriteSvg);
    }
    if (!cart.classList.contains(hide)) {
      closeModal(cart, openCartSvg);
    }
    openModal(comparison, openComparisonSvg);
  });

  openFavorite.addEventListener("click", () => {
    if (!comparison.classList.contains(hide)) {
      closeModal(comparison, openComparisonSvg);
    }
    if (!cart.classList.contains(hide)) {
      closeModal(cart, openCartSvg);
    }
    openModal(favorite, openFavoriteSvg);
  });
};

tabs();
