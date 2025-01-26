import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

const isMobile = window.matchMedia('(max-width: 767px)');
const swiperArr = [];

export const experiences = () => {
  const experienceItems = document.querySelectorAll('.experiences_item-gallery');

  experienceItems?.forEach((subcollection) => {
    if (isMobile.matches) {
      experienceSwiper();
    } else {
      const defaultLabel = subcollection.querySelector('.experiences_subcontent');
      updateCollectionHighlights(subcollection, defaultLabel);
    }

    subcollection.addEventListener('mouseover', (event) => {
      if (isMobile.matches) return;
      const label = event.target?.closest('.experiences_subcontent');
      if (!label) return;
      updateCollectionHighlights(subcollection, label);
    });
  });

  isMobile.addEventListener('change', function () {
    experienceSwiper();
  });
};

const updateCollectionHighlights = (collection, label) => {
  const items = collection.querySelectorAll('.experiences_subitem');
  items?.forEach((item) => {
    const itemLabel = item.querySelector('.experiences_subcontent');
    const figure = item.querySelector('.experiences_subfigure');
    highlightExperience(figure, itemLabel, label == itemLabel);
  });
};

const highlightExperience = (figure, label, highlight = true) => {
  if (highlight) {
    figure.style.opacity = 1;
    label.style.fontStyle = 'italic';
  } else {
    figure.style.opacity = 0;
    label.style.fontStyle = 'normal';
  }
};

const experienceSwiper = () => {
  if (isMobile.matches) {
    const sliders = document.querySelectorAll('.experiences_subcollection-wrap.swiper');
    if (!sliders) return;

    sliders.forEach((slider) => {
      const sliderItems = slider.querySelectorAll('.experiences_subitem');
      sliderItems.forEach((item) => {
        const itemLabel = item.querySelector('.experiences_subcontent');
        const figure = item.querySelector('.experiences_subfigure');
        highlightExperience(figure, itemLabel, true);
      });

      const swiper = new Swiper(slider, {
        modules: [Autoplay],
        loop: true,
        autoplay: true,
        speed: 1000,
        slidesPerView: 1,
        grabCursor: true,
      });
      console.log('swiper created');

      swiperArr.push(swiper);
    });
  } else {
    swiperArr.forEach((swiper) => {
      swiper.destroy();
      console.log('swiper destroyed');
    });
  }
};
