const sign = () => {
  const RED = "#f53b49";
  const GRAY = "rgba(144,156,181,.3)";
  const HIDE = "hide";

  const openBtn = document.querySelectorAll(".sign-block__button");
  const signModal = document.querySelector(".sign");
  const closeBtn = signModal.querySelector(".modal-button");

  const signInBlock = signModal.querySelector(".sign-in");
  const signInBtn = signModal.querySelector(".sign-form__button_signin");
  const showRetoreBlockBtn = signModal.querySelector(
    ".sign-form__button_password"
  );
  const restorePassworBlock = signModal.querySelector(".restore-password");
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

  modal(signModal, openBtn, closeBtn);

  const cleanInputs = (...inputs) => {
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = GRAY;
    });
  };
  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      cleanInputs(email, emailRestore, password);

      errorMessage.classList.add(HIDE);
      if (signInBlock.classList.contains(HIDE)) {
        signInBlock.classList.remove(HIDE);
        restorePassworBlock.classList.add(HIDE);
      }
    });
  });

  showRetoreBlockBtn.addEventListener("click", (e) => {
    e.preventDefault();
    restorePassworBlock.classList.remove(HIDE);
    signInBlock.classList.add(HIDE);
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
    errorMessage.classList.remove(HIDE);
  });

  restorePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validationMail(emailRestore.value)) {
      emailRestore.style.borderColor = RED;
    }
    errorMessage.classList.remove(HIDE);
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
