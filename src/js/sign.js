const sign = () => {
  const openBtns = document.querySelectorAll(".sign-block__button");
  const signModal = document.querySelector(".sign");
  const closeBtn = signModal.querySelector(".modal-button");

  const signInBlock = signModal.querySelector(".sign-in");
  const signInBtn = signModal.querySelector(".sign-form__button_signin");
  const showRetoreBlockBtn = signModal.querySelector(
    ".sign-form__button_password"
  );
  const restorePassworBlock = signModal.querySelector(".sign-restore-password");
  const restorePasswordBtn = signModal.querySelector(
    ".sign-form__button_restore"
  );
  const password = signModal.querySelector(
    ".sign-form__input[type='password']"
  );
  const email = signModal.querySelector(".sign-form__input[type='email']");
  const emailRestore = signModal.querySelector(".sign-form__input_restore");
  const showPasswordBtn = signModal.querySelector(
    ".sign-form__button_show-pswd"
  );
  const errorMessage = signModal.querySelector(".sign__error");

  modal(signModal, openBtns, closeBtn);

  const cleanInputs = (...inputs) => {
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = GRAY;
    });
  };
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cleanInputs(email, emailRestore, password);

      errorMessage.classList.add(hide);
      if (signInBlock.classList.contains(hide)) {
        signInBlock.classList.remove(hide);
        restorePassworBlock.classList.add(hide);
      }
    });
  });

  showRetoreBlockBtn.addEventListener("click", (e) => {
    e.preventDefault();
    restorePassworBlock.classList.remove(hide);
    signInBlock.classList.add(hide);
  });

  const validationMail = (email) => {
    var re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  };

  const validationPassword = (password) => {
    const beginWithoutDigit = /^\D.*$/;
    const withoutSpecialChars = /^[^-() /]*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const minimum8Chars = /^.{8,}$/;
    const withoutSpaces = /^[\S]$/;
    return (
      beginWithoutDigit.test(password) &&
      withoutSpecialChars.test(password) &&
      containsLetters.test(password) &&
      minimum8Chars &&
      withoutSpaces
    );
  };

  const showPassword = (input) => {
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };

  signInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(email.value)) {
      email.style.borderColor = RED;
    }
    if (!validationPassword(password.value)) {
      password.style.borderColor = RED;
    }
    errorMessage.classList.remove(hide);
  });

  restorePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(emailRestore.value)) {
      emailRestore.style.borderColor = RED;
    }
    errorMessage.classList.remove(hide);
  });

  password.addEventListener("click", () => (password.style.borderColor = GRAY));
  email.addEventListener("click", () => (email.style.borderColor = GRAY));
  emailRestore.addEventListener(
    "click",
    () => (emailRestore.style.borderColor = GRAY)
  );

  showPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showPassword(password);
  });
};

sign();
