import { accordion } from '$utils/accordion';
import { bgAccordion } from '$utils/bgAccordion';
import { experiences } from '$utils/experiences';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
import { roomIndiv } from '$utils/roomIndiv';
import { slidersSections } from '$utils/slidersSections';
import { stickyHero } from '$utils/stickyHero';
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
    stickyHero();
    experiences();
    roomIndiv();
    slidersSections();
    bgAccordion();
  }, 100);
});
