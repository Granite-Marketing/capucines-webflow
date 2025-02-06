import { accordion } from '$utils/accordion';
import { buttonAnimation } from '$utils/buttonAnimation';
import { experiences } from '$utils/experiences';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
// import { adjustSubLinks } from '$utils/nav';
import { roomIndiv } from '$utils/roomIndiv';
import { stickyHero } from '$utils/stickyHero';
import { stickySection } from '$utils/stickySection';
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
    stickySection();
    buttonAnimation();
  }, 100);
});
