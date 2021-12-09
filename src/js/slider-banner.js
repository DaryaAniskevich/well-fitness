const sliderBanner = () => {
  const slides = document.querySelectorAll(".banner-content");
  const slidesBlock = document.querySelector(".banner-wrapper");
  const prevBtn = document.querySelector(".banner-buttons__item_prev");
  const nextBtn = document.querySelector(".banner-buttons__item_next");
  const paginationBlock = document.querySelector(".banner-pagination");
  const paginationItem = document.querySelectorAll(".banner-pagination__item");

  let count = 0;
  let width;

  const rollSlider = (count) => {
    slidesBlock.style.transform = `translate(-${count * width}px)`;
  };

  const calculateSliderWidth = () => {
    width = document.querySelector(".banner-container").offsetWidth;
    slidesBlock.style.width = width * slides.length + "px";
    slides.forEach((slide) => {
      slide.style.maxWidth = 1800 + "px";
      slide.style.width = width + "px";
    });
  };

  calculateSliderWidth();

  const changeActivePaginationItem = () => {
    paginationItem.forEach((item) => {
      if (item.id == count) {
        item.classList.add("banner-pagination__item_active");
      } else {
        item.classList.remove("banner-pagination__item_active");
      }
    });
  };

  window.addEventListener("resize", () => {
    calculateSliderWidth();
  });

  const autoSlider = setInterval(() => {
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    changeActivePaginationItem();
    rollSlider(count);
  }, 5000);

  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlider);
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    rollSlider(count);
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlider);
    count--;
    if (count < 0) {
      count = slides.length - 1;
    }
    rollSlider(count);
  });

  slides.forEach((slide) => {
    slide.addEventListener("click", () => clearInterval(autoSlider));
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
      clearInterval(autoSlider);
      if (xDiff > 0) {
        count--;
        if (count <= 0) {
          count = 0;
        }
      } else {
        count++;
        if (count >= slides.length) {
          count = 0;
        }
      }
      changeActivePaginationItem();
      rollSlider(count);
    }
    x1 = null;
    y1 = null;

    return;
  };

  slidesBlock.addEventListener("touchstart", handleTouchStart, false);
  slidesBlock.addEventListener("touchmove", handleTouchMove, false);

  paginationBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("banner-pagination__item")) {
      paginationItem.forEach((item) => {
        if (event.target.id == item.id) {
          count = item.id;
          item.classList.add("banner-pagination__item_active");
        } else {
          item.classList.remove("banner-pagination__item_active");
        }
      });
      rollSlider(count);
    }
  });
};

sliderBanner();
