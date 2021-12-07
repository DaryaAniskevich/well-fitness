const catalog = () => {
  const openBtn = document.querySelector(".header-navigation-catalog__button");
  const catalogBlock = document.querySelector(".catalog");
  const body = document.querySelector("body");
  const searchBlock = document.querySelector(".search");

  openBtn.addEventListener("click", () => {
    searchBlock.classList.add("hide");
    catalogBlock.classList.toggle("hide");
  });

  /* body.addEventListener("click", (e) => {
    if (!e.target.className.includes("catalog")) {
      catalogBlock.classList.add("hide");
    }
  });*/
};

catalog();
