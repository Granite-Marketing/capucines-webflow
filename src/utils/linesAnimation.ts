import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const lineSetup = (line: HTMLElement, scrub: boolean) => {
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
    start: '0% 65%',
    end: '100% 65%',
    markers: false,
    scrub,
    animation: gsap.to(innerLine, { duration: 1, scaleY: 1 }),
  });
};

gsap.registerPlugin(ScrollTrigger);
function linesAnimation() {
  const lines = document.querySelectorAll<HTMLElement>('.vertical-line');
  // get the lines that have the class 'alternate'
  const scrubLines = Array.from(lines).filter((line) => line.classList.contains('scrub'));
  const enterLines = Array.from(lines).filter((line) => line.classList.contains('enter'));

  scrubLines.forEach((line) => lineSetup(line, true));
  enterLines.forEach((line) => lineSetup(line, false));
}

export { linesAnimation };
