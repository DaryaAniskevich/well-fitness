const clubs = () => {
  const clubsBlock = document.querySelector(".clubs-cards");

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, title, href, img } = item;

      const div = document.createElement("div");
      div.classList.add("clubs-cards__item", "category-card");
      div.setAttribute("data-href", href);
      div.innerHTML = `<h3 class="category-card__heading">${title}</h3>
      <img src="./images/db/${img}" alt="${title}" class="category-card__img"/>`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      clubsBlock.append(div);
    });

    const cards = document.querySelectorAll(".clubs-cards__item");

    cards.forEach((item, index) => {
      if (index === 0) {
        item.classList.add(
          "category-card_wide",
          "clubs-cards__item_one",
          "category-card_dark"
        );
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_wide");
        item
          .querySelector(".category-card__heading")
          .classList.add("category-card__heading_white");
      }
      if (index !== 0) {
        item.classList.add("category-card_square");
        item
          .querySelector(".category-card__img")
          .classList.add("category-card__img_square");
      }

      item.querySelector("h3").classList.add("category-card__heading_wide");
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/category/club.json"
  )
    .then((res) => res.json())
    .then((res) => renderCards(res));
};

clubs();
