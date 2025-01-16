import Lenis from 'lenis';

export const lenisGsap = (gsap, ScrollTrigger) => {
  const lenis = new Lenis();

  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
