import { accordion } from '$utils/accordion';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { swiperSliders } from '$utils/swiperSliders';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { experiences } from '$utils/experiences';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
  experiences();
});
