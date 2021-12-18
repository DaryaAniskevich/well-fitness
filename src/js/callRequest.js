const callRequest = () => {
  const openBtn = document.querySelectorAll(".callBack-btn");
  const modalCall = document.querySelector(".modal-call");
  const closeBtn = modalCall.querySelector(".modal-call-content-button");
  const callBackBtn = modalCall.querySelector(
    ".modal-call-content-form__button"
  );
  const inputs = modalCall.querySelectorAll(".modal-call-content-form__input");
  const successMessage = document.querySelector(
    ".modal-call-content-form-text_success"
  );
  const errorMessage = document.querySelector(
    ".modal-call-content-form__error"
  );

  let nameIsValid = true;
  let phoneIsValid = true;

  modalCall.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper") ||
      e.target.classList.contains("modal-call-content-button") ||
      e.target.classList.contains("modal-button__svg")
    ) {
      successMessage.classList.add(hide);
      nameIsValid = true;
      phoneIsValid = true;
      inputs.forEach((input) => (input.style.borderColor = GRAY));
      errorMessage.classList.add(hide);
    }
  });

  modal(modalCall, openBtn, closeBtn);

  const validText = (input) => {
    if (input.value.trim().length <= 1) {
      input.style.borderColor = RED;
      nameIsValid = false;
    }
  };

  const validPhone = (input) => {
    const value = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const valid = value.test(input.value);
    if (!valid) {
      input.style.borderColor = RED;
      errorMessage.classList.remove(hide);
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = GRAY;
      errorMessage.classList.add(hide);
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
          errorMessage.classList.add(hide);
        });
        validPhone(input);
      }
    });
  };

  callBackBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validation(inputs);
    if (nameIsValid && phoneIsValid) {
      inputs.forEach((input) => (input.value = ""));
      successMessage.classList.remove(hide);
      setTimeout(() => {
        modalCall.classList.remove(modal_active);
        successMessage.classList.add(hide);
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callRequest();
