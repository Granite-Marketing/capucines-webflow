import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const isMobile = window.matchMedia('(max-width: 767px)');
const swiperArr = [];
const experienceItems = document.querySelectorAll('.experiences_item-gallery');

export const experiences = () => {
  if (isMobile.matches) {
    console.log('init swiper');
    experienceSwiper();
  } else {
    defaultHighlights();
  }

  experienceItems?.forEach((subcollection) => {
    subcollection.addEventListener('mouseover', (event) => {
      if (isMobile.matches) return;
      const label = event.target?.closest('.experiences_subcontent');
      if (!label) return;
      updateCollectionHighlights(subcollection, label);
    });
  });

  isMobile.addEventListener('change', function () {
    console.log('change');
    if (isMobile.matches) {
      experienceSwiper();
    } else {
      defaultHighlights();
      swiperArr.forEach((swiper) => {
        swiper.destroy();
        console.log('swiper destroyed');
      });
    }
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

const defaultHighlights = () => {
  experienceItems?.forEach((subcollection) => {
    const defaultLabel = subcollection.querySelector('.experiences_subcontent');
    updateCollectionHighlights(subcollection, defaultLabel);
  });
};

const experienceSwiper = () => {
  const sliders = document.querySelectorAll('.experiences_subcollection-wrap.swiper');
  if (!sliders) return;

  sliders.forEach((slider) => {
    const sliderItems = slider.querySelectorAll('.experiences_subitem');
    const pagination = slider
      .closest('.experiences_subcollection-wrap-wrap')
      ?.querySelector('.experiences_subcollection-pagination');

    sliderItems.forEach((item) => {
      const itemLabel = item.querySelector('.experiences_subcontent');
      const figure = item.querySelector('.experiences_subfigure');
      highlightExperience(figure, itemLabel, true);
    });

    const swiper = new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: true,
      autoplay: true,
      grabCursor: true,
      pagination: {
        el: pagination,
      },
      slidesPerView: 1,
    });
    console.log('swiper created');
    swiperArr.push(swiper);
  });
};
