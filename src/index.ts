// import 'splitting/dist/splitting.css';
// import 'splitting/dist/splitting-cells.css';

import { accordion } from '$utils/accordion';
import { bgAccordion } from '$utils/bgAccordion';
import { bookingModal } from '$utils/bookingModal';
import { buttonAnimation } from '$utils/buttonAnimation';
import { experiences } from '$utils/experiences';
import { gaTagging } from '$utils/gaTagging';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { header } from '$utils/header';
import { homeAlternativeHero } from '$utils/homeAlternativeHero';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
import { initMap } from '$utils/map';
import { mapNeeds } from '$utils/mapNeeds';
import { popupModal } from '$utils/popupModal';
// import { popup } from '$utils/popup';
import { roomIndiv } from '$utils/roomIndiv';
import { roomsHeroAnimation } from '$utils/roomsHeroAnimation';
import { slidersSections } from '$utils/slidersSections';
import { stickyHero } from '$utils/stickyHero';
import { stickySection } from '$utils/stickySection';
import { stickyText } from '$utils/stickyText';
import { swiperSliders } from '$utils/swiperSliders';
import { textMask } from '$utils/textMask';

window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  mapNeeds();
  gsapSmoothScroll();
  accordion();
  swiperSliders();
  header();
  // wait page load
  setTimeout(() => {
    homeMain();
    linesAnimation();
    textMask();
    stickyHero();
    experiences();
    bookingModal();
    roomIndiv();
    slidersSections();
    bgAccordion();
    stickySection();
    buttonAnimation();
    roomsHeroAnimation();
    popupModal();
    stickyText();
    homeAlternativeHero();
    gsapBasicAnimations();
    gaTagging();
    setTimeout(() => initMap(), 1000);
    document.querySelectorAll('.js-loading').forEach((item) => {
      item.classList.remove('js-loading');
    });
  }, 100);
});
