import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const textMask = () => {
  const texts = document.querySelectorAll<HTMLElement>('.text-mask');

  if (!texts) return;
  texts.forEach((textEl) => {
    gsap.set(textEl, {
      display: 'inline-block',
    });
    const splitText = new SplitType(textEl, { types: 'words' });
    // find em tag and set it to inline-block
    const ems = textEl.querySelectorAll('em');
    gsap.set(ems, {
      display: 'unset',
    });
    gsap.set(splitText.words, {
      yPercent: 100,
      opacity: 0,
      autoAlpha: 0,
    });
    const tl = gsap.timeline();
    tl.to(splitText.words, {
      ease: (i) => 1 - Math.pow(1 - i, 4),
      duration: 1,
      yPercent: 0,
      opacity: 1,
      autoAlpha: 1,
      stagger: 0.01,
    });
    ScrollTrigger.create({
      trigger: textEl,
      markers: truefalse,
      start: 'top 50%',
      animation: tl,
      toggleActions: 'play reverse play reverse',
    });
  });
};
