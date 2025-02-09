import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const stickyText = () => {
  const stickyText = document.querySelector('[anim=sticky]');

  if (!stickyText) return;

  ScrollTrigger.create({
    trigger: stickyText.parentElement,
    start: 'top 20%',
    end: '80% 20%',
    pin: stickyText,
    markers: false,
  });
};
