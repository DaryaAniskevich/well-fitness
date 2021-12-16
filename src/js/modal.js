const modal = (modal, openBtn, closeBtn) => {
  const modal_active = "modal_active";

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add(modal_active);
      modal.querySelector("input").focus();
    });
  });
  closeBtn.addEventListener("click", () => {
    modal.classList.remove(modal_active);
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modal_active) ||
      e.target.classList.contains("modal-wrapper")
    ) {
      modal.classList.remove(modal_active);
    }
  });
};
