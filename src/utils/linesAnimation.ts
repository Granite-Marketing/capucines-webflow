import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const lineSetup = (
  line: HTMLElement,
  scrub: boolean,
  duration?: number,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
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
  if (direction === 'vertical') {
    gsap.set(innerLine, { transformOrigin: 'top', scaleY: 0 });

    ScrollTrigger.create({
      trigger: line,
      start: '0% 65%',
      end: '100% 65%',
      markers: false,
      scrub,
      animation: gsap.to(innerLine, { duration: duration || 1, scaleY: 1 }),
    });
  } else if (direction === 'horizontal') {
    gsap.set(innerLine, { transformOrigin: 'left', scaleX: 0 });

    ScrollTrigger.create({
      trigger: line,
      start: '0% 65%',
      end: '100% 65%',
      markers: false,
      scrub,
      animation: gsap.to(innerLine, { duration: duration || 1, scaleX: 1 }),
    });
  }
};

gsap.registerPlugin(ScrollTrigger);
function animate(className: string) {
  const lines = document.querySelectorAll<HTMLElement>(className);
  // get the lines that have the class 'alternate'
  const scrubLines = Array.from(lines).filter((line) => line.classList.contains('scrub'));
  const enterLines = Array.from(lines).filter((line) => line.classList.contains('enter'));

  if (scrubLines.length > 0) {
    scrubLines.forEach((line) => lineSetup(line, true));
  }
  if (enterLines.length > 0) {
    enterLines.forEach((line) => {
      const duration = line.getAttribute('data-duration');
      lineSetup(line, false, duration ? parseInt(duration) : undefined);
    });
  }
  if (scrubLines.length === 0 && enterLines.length === 0) {
    lines.forEach((line) => {
      const duration = line.getAttribute('data-duration');
      lineSetup(line, false, duration ? parseInt(duration) : undefined, 'horizontal');
    });
  }
}

const linesAnimation = () => {
  animate('.vertical-line');
  animate('.horizontal-line');
};

export { linesAnimation };
