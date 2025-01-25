import { accordion } from '$utils/accordion';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
import { swiperSliders } from '$utils/swiperSliders';
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  gsapSmoothScroll();
  accordion();
  swiperSliders();
  // wait page load
  setTimeout(() => {
    homeMain();
    linesAnimation();
  }, 100);
});
