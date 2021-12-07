const callback = () => {
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

  modal(modalCall, openBtn, closeBtn);

  let nameIsValid = true;
  let phoneIsValid = true;

  const validText = (input) => {
    if (input.value.trim().length <= 1) {
      input.style.borderColor = "#f53b49";
      nameIsValid = false;
    }
  };

  const validPhone = (input) => {
    const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const valid = re.test(input.value);
    if (!valid) {
      input.style.borderColor = "#f53b49";
      document
        .querySelector(".modal-call-content-form__error")
        .classList.remove("hide");
      phoneIsValid = false;
    }
  };

  const validation = (inputs) => {
    inputs.forEach((input) => {
      input.style.borderColor = `rgba(144,156,181,.5)`;
      document
        .querySelector(".modal-call-content-form__error")
        .classList.add("hide");
      if (input.name === "name") {
        input.addEventListener("click", () => {
          input.style.borderColor = `rgba(144,156,181,.5)`;
        });
        validText(input);
      } else if (input.name === "phone") {
        input.addEventListener("click", () => {
          input.style.borderColor = `rgba(144,156,181,.5)`;
          document
            .querySelector(".modal-call-content-form__error")
            .classList.add("hide");
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
      successMessage.classList.remove("hide");
      setTimeout(() => {
        modalCall.classList.remove("modal_active");
        successMessage.classList.add("hide");
      }, 5000);
    }
    nameIsValid = true;
    phoneIsValid = true;
  });
};

callback();
