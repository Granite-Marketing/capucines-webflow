import { accordion } from '$utils/accordion';
import { experiences } from '$utils/experiences';
import { stickyHero } from '$utils/stickyHero';

import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
import { swiperSliders } from '$utils/swiperSliders';
import { textMask } from '$utils/textMask';
window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  gsapSmoothScroll();
  accordion();
  swiperSliders();
  // wait page load
  setTimeout(() => {
    homeMain();
    linesAnimation();
    textMask();
  }, 100);
  experiences();
  stickyHero();
});
