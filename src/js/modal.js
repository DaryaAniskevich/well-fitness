const modal = (modal, openBtn, closeBtn) => {
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("modal_active");
    });
  });
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("modal_active");
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      modal.classList.remove("modal_active");
    }
  });
};
