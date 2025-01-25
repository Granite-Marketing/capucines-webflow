import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
function linesAnimation() {
  const lines = document.querySelectorAll<HTMLElement>('.vertical-line');

  lines.forEach((line) => {
    if (lines.length === 0) return;
    const innerLine = document.createElement('div');
    innerLine.classList.add('section-line-inner');
    innerLine.style.cssText = `
      width: 100%;
      height: 100%;
      background: var(--border-color--border-primary);
    `;
    line.style.backgroundColor = 'transparent';
    if (line.classList.contains('alternate')) {
      innerLine.style.backgroundColor = 'var(--border-color--border-alternate)';
    }
    line.appendChild(innerLine);
    gsap.set(innerLine, { transformOrigin: 'top', scaleY: 0 });

    ScrollTrigger.create({
      trigger: line,
      start: '0% 40%',
      end: '100% 40%',
      markers: false,
      scrub: true,
      animation: gsap.to(innerLine, { duration: 1, scaleY: 1 }),
    });
  });
}

export { linesAnimation };
