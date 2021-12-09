const sliderBanner = () => {
  const slides = document.querySelectorAll(".banner-content");
  const slidesBlock = document.querySelector(".banner-wrapper");
  const prevBtn = document.querySelector(".banner-buttons__item_prev");
  const nextBtn = document.querySelector(".banner-buttons__item_next");

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

  window.addEventListener("resize", () => {
    calculateSliderWidth();
  });

  const autoSlider = setInterval(() => {
    count++;
    if (count >= slides.length) {
      count = 0;
    }
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
};

sliderBanner();
