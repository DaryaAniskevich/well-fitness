const news = () => {
  const newsBlock = document.querySelector(".news-cards");

  const renderBlock = (data) => {
    data.forEach((item, index) => {
      const { id, href, img, title, description, date } = item;
      if (index < 6) {
        const div = document.createElement("div");
        div.classList.add("news-cards__item", "news-card");
        div.setAttribute("data-href", href);

        div.innerHTML = `<img src="./images/db/${img}" alt="${title}" class="news-card__img" />
    <div class="news-card-content">
      <h4 class="news-card__heading">
        ${title}
      </h4>
      <p class="news-card__paragraf">
        ${description}
      </p>
      <p class="news-card__paragraf news-card__paragraf_light">
        ${date}
      </p>
      </div>`;

        div.addEventListener("click", () => {
          window.location.href = div.dataset.href;
        });

        newsBlock.append(div);
      }
    });
  };

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/news.json"
  )
    .then((res) => res.json())
    .then((res) => renderBlock(res));
};

news();
