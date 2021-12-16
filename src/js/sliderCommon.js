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
        (screen.width > 970 && screen.width < 1300 && count === 7)
      ) {
        nextBtn.classList.add(hide);
      }

      if (
        (screen.width > 1300 && count === 6) ||
        (screen.width > 970 && screen.width < 1300 && count === 8)
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
      if (screen.width > 970 && count < 2) {
        nextBtn.classList.remove(hide);
      }
    } else if (elNumber === 10) {
      if (
        (screen.width > 1300 && count < 5) ||
        (screen.width > 970 && screen.width < 1300 && count < 7)
      ) {
        nextBtn.classList.remove(hide);
      }
    }
  });

  let x1 = null;
  let y1 = null;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  };

  const handleTouchMove = (event) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        count--;
        if (count <= 0) {
          count = 0;
        }
      } else {
        count++;
        if (elNumber === 6) {
          if (
            (screen.width > 970 && count === 3) ||
            (screen.width > 559 && screen.width < 970 && count === 4) ||
            (screen.width <= 559 && count === 7)
          ) {
            count = 0;
          }
        } else if (elNumber === 10) {
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
      }
      rollSlider(count);
    }
    x1 = null;
    y1 = null;

    return;
  };

  slidesWrapper.addEventListener("touchstart", handleTouchStart, false);
  slidesWrapper.addEventListener("touchmove", handleTouchMove, false);
};
