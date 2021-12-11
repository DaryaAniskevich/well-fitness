const home = () => {
  const cardsBlock = document.querySelector(".home-cards");

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, title, href, img } = item;

      const div = document.createElement("div");
      div.setAttribute("data-href", href);
      div.classList.add("home-cards__item", "category-card");
      div.innerHTML = `<h3 class="category-card__heading">${title}</h3>
      <img src="./images/db/${img}" alt="${title}" class="category-card__img"/>`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      cardsBlock.append(div);
    });

    const cards = document.querySelectorAll(".home-cards__item");

    cards.forEach((item, index) => {
      if (index === 0 || index === 1) {
        item.classList.add("category-card_hight");
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_height");
      }
      if (index === 0) {
        item.classList.add("category-card_dark");
        item.classList.add("home-cards__item_one");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_white");
      }
      if (index === 1) {
        item.classList.add("home-cards__item_two");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_gray");
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/category/home.json"
  )
    .then((res) => res.json())
    .then((res) => renderCards(res));
};

home();
