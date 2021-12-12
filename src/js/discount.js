const discount = () => {
  const discountBlock = document.querySelector(".discount-cards");

  const renderBlock = (data) => {
    const renderCard = (
      div,
      discount,
      choice,
      neww,
      img,
      availibile,
      name,
      raiting,
      price,
      discountprice
    ) => {
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
              "
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="5"
                  width="2"
                  height="17"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="10"
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
                <rect
                  x="15"
                  y="4"
                  width="2"
                  height="13"
                  rx="1"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img
                    good-card-icons-item__img_comparison
                  "
                />
              </svg>
            </button>
            <button
              class="good-card-icons-item good-card-icons-item_favorite button"
            >
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.757 1.66341C16.5388 -0.55417 12.9303 -0.55417 10.7127 1.66341L10.1976 2.17818L9.68282 1.66341C7.46524 -0.55447 3.85642 -0.55447 1.63884 1.66341C-0.533711 3.83597 -0.547819 7.2797 1.60613 9.67407C3.57067 11.8571 9.36465 16.5735 9.61049 16.7731C9.77737 16.9088 9.97818 16.9749 10.1778 16.9749C10.1844 16.9749 10.191 16.9749 10.1973 16.9746C10.4038 16.9842 10.6118 16.9133 10.7841 16.7731C11.0299 16.5735 16.8245 11.8571 18.7897 9.67377C20.9433 7.2797 20.9292 3.83597 18.757 1.66341ZM17.451 8.46923C15.9192 10.1708 11.7089 13.6803 10.1973 14.9257C8.68569 13.6806 4.47625 10.1714 2.94484 8.46953C1.44224 6.79944 1.42813 4.42098 2.91212 2.93699C3.67002 2.17938 4.66535 1.80028 5.66068 1.80028C6.65601 1.80028 7.65134 2.17908 8.40925 2.93699L9.54145 4.06919C9.67622 4.20396 9.84611 4.2844 10.0244 4.31262C10.3138 4.37475 10.6277 4.29401 10.8528 4.06949L11.9856 2.93699C13.5018 1.42148 15.9679 1.42178 17.4831 2.93699C18.9671 4.42098 18.953 6.79944 17.451 8.46923Z"
                  fill="#858FA4"
                  class="
                    good-card-icons-item__img good-card-icons-item__img_favorite
                  "
                />
              </svg>
            </button>
          </div>
        </div>
        <img src="./images/db/${img}" alt=${name} class="good-card__image" />
        <div class="good-card-description">
          <div class="good-card-availibility">
          ${
            availibile
              ? '<span class="good-card-availibility good-card-availibility_available">В наличии</span><span class="good-card-availibility_blue">Есть в шоу-руме</span>'
              : '<span class="good-card-availibility good-card-availibility_not-available">Нет в наличии</span>'
          }
            
          </div>
          <h4 class="good-card__heading">${name}</h4>
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
            <button class="good-card__button button button_catalog button_buy">
              Купить
            </button>
          </div>
        </div>
        `;
    };
    data.forEach((item) => {
      const {
        id,
        img,
        name,
        label,
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

      if (item.discount) {
        const div = document.createElement("div");
        div.classList.add("discount-cards-item", "good-card");

        renderCard(
          div,
          discount,
          choice,
          neww,
          img,
          availibility,
          name,
          raiting,
          price,
          discountPrice
        );

        div.setAttribute("data-href", href);
        div.addEventListener("click", () => {
          window.location.href = div.dataset.href;
        });
        discountBlock.append(div);
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
