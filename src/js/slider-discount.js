const sliderDiscount = () => {
  const slidesWrapper = document.querySelector(".discount-cards");
  const prevBtn = document.querySelector(".discount-controls__item_prev");
  const nextBtn = document.querySelector(".discount-controls__item_next");
  sliderCommon(slidesWrapper, prevBtn, nextBtn, 10);
};

sliderDiscount();
