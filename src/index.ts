import { greetUser } from '$utils/greet';
import { accordion } from '$utils/accordion';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { lenisGsap } from '$utils/lenisGsap';
import { swiperSliders } from '$utils/swiperSliders';
import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'John Doe';
  greetUser(name);
  accordion();
  gsapBasicAnimations(gsap, ScrollTrigger);
  lenisGsap(gsap, ScrollTrigger);
  swiperSliders();
});
