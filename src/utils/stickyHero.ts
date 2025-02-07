import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const isMobile = window.matchMedia('(max-width: 767px)');
const swiperArr = [];

export const stickyHero = () => {
  if (isMobile.matches) {
    console.log('init swiper');
    stickyHeroSwiper();
  }

  isMobile.addEventListener('change', function () {
    console.log('change');
    if (isMobile.matches) {
      stickyHeroSwiper();
    } else {
      swiperArr.forEach((swiper) => {
        swiper.destroy();
        console.log('swiper destroyed');

        desktopStickyHero();
      });
    }
  });
};

const desktopStickyHero = () => {
  // TO DO
};

const stickyHeroSwiper = () => {
  const block = document.querySelector('.sticky-hero_images-side');
  if (!block) return;

  const slider = block.querySelector('.swiper');
  const pagination = block.querySelector('.sticky-hero_pagination.is-mob');

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
};
