const tabs = () => {
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
    if (!comparison.classList.contains("hide")) {
      comparison.classList.add("hide");
      openComparisonSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    if (!favorite.classList.contains("hide")) {
      favorite.classList.add("hide");
      openFavoriteSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    openCartSvg.classList.toggle("header-navigation-buttons-item__img_active");
    cart.classList.toggle("hide");
  });

  /* body.addEventListener("click", (e) => {
    if (!e.target.className.includes("cart")) {
      openBtnSvg.classList.remove("header-navigation-buttons-item__img_active");
      cart.classList.add("hide");
    }
  });*/

  openComparison.addEventListener("click", () => {
    if (!cart.classList.contains("hide")) {
      cart.classList.add("hide");
      openCartSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    if (!favorite.classList.contains("hide")) {
      favorite.classList.add("hide");
      openFavoriteSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    openComparisonSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    comparison.classList.toggle("hide");
  });

  /* body.addEventListener("click", (e) => {
    if (!e.target.className.includes("comparison")) {
      openBtnSvg.classList.remove("header-navigation-buttons-item__img_active");
      comparison.classList.add("hide");
    } 
  });*/

  openFavorite.addEventListener("click", () => {
    if (!comparison.classList.contains("hide")) {
      comparison.classList.add("hide");
      openComparisonSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    if (!favorite.classList.contains("hide")) {
      cart.classList.add("hide");
      openCartSvg.classList.remove(
        "header-navigation-buttons-item__img_active"
      );
    }
    openFavoriteSvg.classList.toggle(
      "header-navigation-buttons-item__img_active"
    );
    favorite.classList.toggle("hide");
  });

  /* body.addEventListener("click", (e) => {
    if (!e.target.className.includes("favorite")) {
      openBtnSvg.classList.remove("header-navigation-buttons-item__img_active");
      favorite.classList.add("hide");
    }
  });*/
};

tabs();
