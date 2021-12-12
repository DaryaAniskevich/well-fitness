const sliderCommon = (slidesWrapper, prevBtn, nextBtn, elNumber) => {
  const hide = "hide";

  let count = 0;
  let width = 400;

  if (screen.width < 430) {
    if (elNumber === 10) {
      width = screen.width / 2 + 25;
    } else {
      width = screen.width / 2 + 40;
    }
  } else if (screen.width < 960) {
    width = screen.width / 2 - 50;
  } else if (screen.width < 1280) {
    width = 300;
  }

  const rollSlider = (count) => {
    slidesWrapper.style.transform = `translate(-${count * width}px)`;
  };

  nextBtn.addEventListener("click", () => {
    count++;
    if (elNumber === 6) {
      if (
        (screen.width > 970 && count === 2) ||
        (screen.width > 559 && screen.width < 970 && count === 3) ||
        (screen.width <= 559 && count === 6)
      ) {
        nextBtn.classList.add(hide);
      }

      if (
        (screen.width > 970 && count === 3) ||
        (screen.width > 559 && screen.width < 970 && count === 4) ||
        (screen.width <= 559 && count === 7)
      ) {
        count = 0;
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count === 5) ||
        (screen.width > 970 && screen.width < 1300 && count === 7) ||
        (screen.width > 559 && screen.width < 970 && count === 5) ||
        (screen.width <= 559 && count === 10) ||
        (screen.width === 320 && count === 11)
      ) {
        nextBtn.classList.add(hide);
      }

      if (
        (screen.width > 1300 && count === 6) ||
        (screen.width > 970 && screen.width < 1300 && count === 8) ||
        (screen.width > 559 && screen.width < 970 && count === 6) ||
        (screen.width <= 559 && count === 11) ||
        (screen.width === 320 && count === 12)
      ) {
        count = 0;
      }
    }

    rollSlider(count);
    if (count > 0) {
      prevBtn.classList.remove(hide);
    }
  });

  prevBtn.addEventListener("click", () => {
    count--;

    rollSlider(count);
    if (count === 0) {
      prevBtn.classList.add("hide");
    }

    if (elNumber === 6) {
      if (
        (screen.width > 970 && count < 2) ||
        (screen.width > 559 && screen.width < 970 && count < 3) ||
        (screen.width <= 559 && count < 7)
      ) {
        nextBtn.classList.remove(hide);
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count === 6) ||
        (screen.width > 970 && screen.width < 1300 && count < 7) ||
        (screen.width > 559 && screen.width < 970 && count < 6) ||
        (screen.width <= 559 && count < 11) ||
        (screen.width === 320 && count === 12)
      ) {
        nextBtn.classList.remove(hide);
      }
    }
  });
};
