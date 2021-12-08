const search = () => {
  const modal_active = "modal_active";
  const openBtn = document.querySelectorAll(".search-btn");
  const searchBlock = document.querySelector(".search");
  const closeBtn = searchBlock.querySelector(".search-form-button");

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchBlock.classList.add(modal_active);
    });
  });
  closeBtn.addEventListener("click", () => {
    searchBlock.classList.remove(modal_active);
  });

  searchBlock.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      searchBlock.classList.remove(modal_active);
    }
  });

  window.addEventListener("scroll", () => {
    if (
      searchBlock.classList.contains(modal_active) &&
      pageYOffset > searchBlock.offsetHeight - 50
    ) {
      searchBlock.classList.remove(modal_active);
    }
  });
};

search();
