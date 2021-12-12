const sliderNews = () => {
  const slidesWrapper = document.querySelector(".news-cards");
  const prevBtn = document.querySelector(".news-controls__item_prev");
  const nextBtn = document.querySelector(".news-controls__item_next");
  sliderCommon(slidesWrapper, prevBtn, nextBtn, 6);
};

sliderNews();
