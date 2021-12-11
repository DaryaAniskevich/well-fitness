const brands = () => {
  const brandsBlock = document.querySelector(".brands-cards");
  const brandsButtons = document.querySelectorAll(".brands-buttons__item");

  let category = "all";

  const renderCards = (data) => {
    data.forEach((item) => {
      const { id, name, img, href } = item;
      const div = document.createElement("div");
      div.classList.add("brands-cards-item");
      div.setAttribute("data-href", href);
      div.innerHTML = `  <img src="./images/db/${img}" alt="${name}" class="brands-cards-item__img" />`;

      div.addEventListener("click", () => {
        window.location.href = div.dataset.href;
      });

      brandsBlock.append(div);
    });
  };

  const getData = (category) => {
    fetch(
      `https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/brands/${category}.json`
    )
      .then((res) => res.json())
      .then((res) => renderCards(res));
  };

  brandsButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      brandsButtons.forEach((button) => {
        button.classList.remove("brands-buttons__item_active");
      });
      brandsBlock.innerHTML = "";
      button.classList.add("brands-buttons__item_active");
      category = button.dataset.brand;
      getData(category);
    });
  });

  getData("all");
};

brands();
