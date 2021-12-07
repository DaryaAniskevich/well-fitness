const search = () => {
  const openBtn = document.querySelectorAll(".search-btn");
  const searchBlock = document.querySelector(".search");
  const closeBtn = searchBlock.querySelector(".search-form-button");
  const body = document.querySelector("body");
  const catalogBlock = document.querySelector(".catalog");

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      catalogBlock.classList.add("hide");
      searchBlock.classList.remove("hide");
    });
  });
  closeBtn.addEventListener("click", () => {
    searchBlock.classList.add("hide");
  });

  /* body.addEventListener("click", (e) => {
    if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
      if (!e.target.className.includes("search")) {
        searchBlock.classList.add("hide");
      }
    }
  });*/
};

search();
