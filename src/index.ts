import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

import { accordion } from '$utils/accordion';
import { bgAccordion } from '$utils/bgAccordion';
import { buttonAnimation } from '$utils/buttonAnimation';
import { experiences } from '$utils/experiences';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { header } from '$utils/header';
import { homeMain } from '$utils/homeMain';
import { linesAnimation } from '$utils/linesAnimation';
import { initMap } from '$utils/map';
// import { popup } from '$utils/popup';
import { roomIndiv } from '$utils/roomIndiv';
import { slidersSections } from '$utils/slidersSections';
import { stickyHero } from '$utils/stickyHero';
import { stickySection } from '$utils/stickySection';
import { stickyText } from '$utils/stickyText';
import { swiperSliders } from '$utils/swiperSliders';
import { textMask } from '$utils/textMask';

window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
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
    roomIndiv();
    slidersSections();
    bgAccordion();
    stickySection();
    buttonAnimation();
    // popup();
    stickyText();
    setTimeout(() => initMap(), 1000);
  }, 100);
});
