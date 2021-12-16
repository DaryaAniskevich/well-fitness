const phoneModal = () => {
  const choosePhoneBtn = document.querySelector(".header-phone-choosen");
  const allPhonesBlock = document.querySelector(".header-phone-open");
  const selectedPhone = document.querySelectorAll(".header-phone-open__item");
  const phoneButtonContent = choosePhoneBtn.querySelector(
    ".header-phone-choosen__item"
  );

  choosePhoneBtn.addEventListener("click", () => {
    allPhonesBlock.classList.remove(hide);
  });

  selectedPhone.forEach((item) => {
    item.addEventListener("click", () => {
      allPhonesBlock.classList.add(hide);
      phoneButtonContent.innerHTML = `<span class="header-phone-choosen__item_white">${item.children[0].dataset.phone}</span> ${item.children[1].dataset.city}`;
    });
  });
};

phoneModal();
