const callRequest = () => {
  const RED = "#f53b49";
  const GRAY = `rgba(144,156,181,.5)`;
  const HIDE = "hide";
  const modal_active = "modal_active";

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

  modal(modalCall, openBtn, closeBtn);

  let nameIsValid = true;
  let phoneIsValid = true;

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

      errorMessage.classList.remove(HIDE);
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = GRAY;
      errorMessage.classList.add(HIDE);
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = GRAY;
          errorMessage.classList.add(HIDE);
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
      successMessage.classList.remove(HIDE);
      setTimeout(() => {
        modalCall.classList.remove(modal_active);
        successMessage.classList.add(HIDE);
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callRequest();
