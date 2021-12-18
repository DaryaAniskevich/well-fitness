const discount = () => {
  const active_btn = "discount-heading-buttons__item_active";
  const discountBlock = document.querySelector(".discount-cards");
  const filterBtns = document.querySelectorAll(
    ".discount-heading-buttons__item"
  );
  const openCartBtn = document.querySelector(
    ".header-navigation-buttons-item_cart"
  );
  const numberInCart = openCartBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const openFavoriteBtn = document.querySelector(
    ".header-navigation-buttons-item_favorite"
  );
  const numberInFavorite = openFavoriteBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );
  const modalFavorite = document.querySelector(".modal-favorite");
  const favoriteFooter = modalFavorite.querySelector(".modal-favorite-footer");
  const modalComparison = document.querySelector(".modal-comparison");
  const comparisonFooter = modalComparison.querySelector(
    ".modal-comparison-footer"
  );
  const openComparisonBtn = document.querySelector(
    ".header-navigation-buttons-item_comparison"
  );
  const numberInComparison = openComparisonBtn.querySelector(
    ".header-navigation-buttons-item__span"
  );

  const renderBlock = (data) => {
    const renderCard = (
      block,
      id,
      discount,
      choice,
      neww,
      img,
      availibile,
      name,
      raiting,
      price,
      discountprice,
      href
    ) => {
      let inFavorite = false;
      let inCart = false;
      let inComparison = false;

      const storageArray = (...args) => {
        args.forEach((arg) => {
          const array = JSON.parse(localStorage.getItem(arg))
            ? JSON.parse(localStorage.getItem(arg))
            : [];

          array.map((item) => {
            if (item.id === id) {
              if (arg === "favorite") {
                inFavorite = true;
              } else if (arg === "cart") {
                inCart = true;
              } else if (arg === "comparison") {
                inComparison = true;
              }
            }
          });
        });
      };

      storageArray("favorite", "cart", "comparison");

      const div = document.createElement("div");
      div.classList.add("discount-cards-item", "good-card");

      div.innerHTML = `
        <div class="good-card-icons">
          <div class="good-card-icons-left">
            ${
              discount
                ? "<div class='good-card-icons-item good-card-icons-item_red'><img class='good-card-icons-item__img good-card-icons-item__img_discount' src='./images/discount.svg' alt='discount'/></div>"
                : ""
            }
           ${
             choice
               ? ' <div class="good-card-icons-item good-card-icons-item_blue"><img class="good-card-icons-item__img good-card-icons-item__img_choice" src="./images/choice.svg" alt="choice"/></div>'
               : ""
           }
            ${
              neww
                ? '<div class="good-card-icons-item good-card-icons-item_green"><img class="good-card-icons-item__img good-card-icons-item__img_new" src="./images/new.svg"alt="new"/></div>'
                : ""
            }
          </div>
          <div class="good-card-icons-right">
            <button
              class="
                good-card-icons-item good-card-icons-item_comparison
                button
              " data-index="${id}" title="Сравнить"
            >
            ${
              inComparison
                ? `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`
                : `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#858FA4" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`
            }
            </button>
            <button
              class="good-card-icons-item good-card-icons-item_favorite button" data-index="${id}" title="В избранное"
            >${
              inFavorite
                ? `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/></svg>`
                : `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M18.757 1.66341C16.5388 -0.55417 12.9303 -0.55417 10.7127 1.66341L10.1976 2.17818L9.68282 1.66341C7.46524 -0.55447 3.85642 -0.55447 1.63884 1.66341C-0.533711 3.83597 -0.547819 7.2797 1.60613 9.67407C3.57067 11.8571 9.36465 16.5735 9.61049 16.7731C9.77737 16.9088 9.97818 16.9749 10.1778 16.9749C10.1844 16.9749 10.191 16.9749 10.1973 16.9746C10.4038 16.9842 10.6118 16.9133 10.7841 16.7731C11.0299 16.5735 16.8245 11.8571 18.7897 9.67377C20.9433 7.2797 20.9292 3.83597 18.757 1.66341ZM17.451 8.46923C15.9192 10.1708 11.7089 13.6803 10.1973 14.9257C8.68569 13.6806 4.47625 10.1714 2.94484 8.46953C1.44224 6.79944 1.42813 4.42098 2.91212 2.93699C3.67002 2.17938 4.66535 1.80028 5.66068 1.80028C6.65601 1.80028 7.65134 2.17908 8.40925 2.93699L9.54145 4.06919C9.67622 4.20396 9.84611 4.2844 10.0244 4.31262C10.3138 4.37475 10.6277 4.29401 10.8528 4.06949L11.9856 2.93699C13.5018 1.42148 15.9679 1.42178 17.4831 2.93699C18.9671 4.42098 18.953 6.79944 17.451 8.46923Z" fill="#858FA4" class="good-card-icons-item__img good-card-icons-item__img_favorite" data-index="${id}"/></svg>`
            }
              
            </button>
          </div>
        </div>
        <img src="./images/db/${img}" alt=${name} class="good-card__image good-card__link" data-href="${href}" />
        <div class="good-card-description">
          <div class="good-card-availibility">
          ${
            availibile
              ? '<span class="good-card-availibility good-card-availibility_available">В наличии</span><span class="good-card-availibility_blue">Есть в шоу-руме</span>'
              : '<span class="good-card-availibility good-card-availibility_not-available">Нет в наличии</span>'
          }
            
          </div>
          <h4 class="good-card__heading good-card__link" data-href=${href}>${name}</h4>
          <div class="good-card-rating">Рейтинг ${'<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0.5L7.91148 3.86908L11.7063 4.6459L9.09284 7.50492L9.52671 11.3541L6 9.752L2.47329 11.3541L2.90716 7.50492L0.293661 4.6459L4.08852 3.86908L6 0.5Z" fill="#F99808"/></svg>'.repeat(
            Math.round(raiting)
          )}</div>
          <div class="good-card-bottom">
            <div class="good-card-price">
              <div class="good-card-price__item">${
                discount ? discountprice : price
              } ₽</div>
              <div class="good-card-price__item_crossed">${
                discount ? price : ""
              } ₽</div>
            </div>
            ${
              availibile
                ? ` <button class="good-card__button button button_catalog button_buy" data-index="${id}">${
                    inCart ? "&#10004; В корзине" : "Купить"
                  }</button>`
                : ""
            }
          </div>
        </div>
        `;

      const linksToGood = div.querySelectorAll(".good-card__link");
      linksToGood.forEach((link) => {
        link.addEventListener("click", () => {
          window.location.href = link.dataset.href;
        });
      });

      block.append(div);

      const addToCartBtn = div.querySelector(".good-card__button");

      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", (e) => {
          const cartItem = {
            name,
            price: discountprice,
            id,
            img,
            count: 1,
          };

          addToCart(cartItem);

          numberInCart.innerHTML = JSON.parse(
            localStorage.getItem("cart")
          ).length;
          renderCartItems(JSON.parse(localStorage.getItem("cart")));
          renderCartFooter();
          e.target.innerHTML = `&#10004; В корзине`;
        });
      }

      const createTabItem = (
        localStorageItem,
        countBlock,
        modal,
        blockFooter
      ) => {
        const tabItem = {
          name,
          price: discountprice,
          id,
          img,
        };

        addToTabs(tabItem, localStorageItem);
        const cartArray = JSON.parse(localStorage.getItem(localStorageItem))
          ? JSON.parse(localStorage.getItem(localStorageItem))
          : [];
        countBlock.innerHTML = cartArray.length;
        renderTabsItems(cartArray, modal);
        blockFooter.style.display = "flex";
      };

      const addToFavoriteBtn = div.querySelector(
        ".good-card-icons-item_favorite"
      );
      addToFavoriteBtn.addEventListener("click", (e) => {
        createTabItem(
          "favorite",
          numberInFavorite,
          modalFavorite,
          favoriteFooter
        );
        if (e.target.classList.contains("good-card-icons-item")) {
          e.target.innerHTML = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/> </svg>`;
        } else {
          e.target.innerHTML = `
          <path d="M22.0718 1.95979C19.4616 -0.652909 15.2154 -0.652909 12.6059 1.95979L11.9998 2.56628L11.394 1.95979C8.78455 -0.653262 4.53795 -0.653262 1.92847 1.95979C-0.628032 4.51944 -0.644633 8.57675 1.88997 11.3977C4.2017 13.9698 11.0196 19.5265 11.3089 19.7617C11.5053 19.9215 11.7416 19.9993 11.9765 19.9993C11.9842 19.9993 11.992 19.9993 11.9994 19.999C12.2424 20.0103 12.4872 19.9268 12.6899 19.7617C12.9792 19.5265 19.7979 13.9698 22.1103 11.3974C24.6445 8.57675 24.6279 4.51944 22.0718 1.95979Z" fill="#F53B49" data-index="${id}"/>
          `;
        }
      });

      const addToComparisonBtn = div.querySelector(
        ".good-card-icons-item_comparison"
      );
      addToComparisonBtn.addEventListener("click", (e) => {
        createTabItem(
          "comparison",
          numberInComparison,
          modalComparison,
          comparisonFooter
        );
        if (e.target.classList.contains("good-card-icons-item")) {
          e.target.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${id}"> <rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/></svg>`;
        } else {
          e.target.innerHTML = `<rect y="7" width="2" height="10" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="5" width="2" height="17" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/> <rect x="10" y="7" width="2" height="10"  rx="1" fill="#f53b49" class=" good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}" /> <rect x="15" y="4" width="2" height="13" rx="1" fill="#f53b49" class="good-card-icons-item__img good-card-icons-item__img_comparison" data-index="${id}"/>`;
        }
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => (discountBlock.innerHTML = ""));
    });

    data.forEach((item) => {
      const {
        id,
        img,
        name,
        keywords,
        description,
        price,
        discountPrice,
        category,
        subcategory,
        cities,
        href,
        discount,
        choice,
        neww,
        availibility,
        raiting,
      } = item;

      if (discount) {
        renderCard(
          discountBlock,
          id,
          discount,
          choice,
          neww,
          img,
          availibility,
          name,
          raiting,
          price,
          discountPrice,
          href
        );

        filterBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            filterBtns.forEach((btn) => btn.classList.remove(active_btn));
            if (btn.dataset.filter === "new") {
              btn.classList.add(active_btn);
              if (discount && neww) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
            if (btn.dataset.filter === "recommendation") {
              btn.classList.add(active_btn);
              if (discount && choice) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
            if (btn.dataset.filter === "all") {
              btn.classList.add(active_btn);
              if (discount) {
                renderCard(
                  discountBlock,
                  id,
                  discount,
                  choice,
                  neww,
                  img,
                  availibility,
                  name,
                  raiting,
                  price,
                  discountPrice,
                  href
                );
              }
            }
          });
        });
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/goods.json"
  )
    .then((res) => res.json())
    .then((res) => renderBlock(res));
};

discount();
