import { gsap } from 'gsap';
import SplitText from 'gsap/src/SplitText';

gsap.registerPlugin(SplitText);
export const buttonAnimation = () => {
  const buttons = document.querySelectorAll('.button');

  if (!buttons) return;

  buttons.forEach((button) => {
    // Get the text content and create a clone
    const text = button.textContent || '';
    const originalSpan = document.createElement('span');
    const cloneSpan = document.createElement('span');

    originalSpan.textContent = text;
    cloneSpan.textContent = text;

    // Clear button and add spans
    button.textContent = '';
    button.appendChild(originalSpan);
    button.appendChild(cloneSpan);

    gsap.set(button, {
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateAreas: '"layer"',
    });

    gsap.set(button.querySelectorAll('span'), {
      display: 'block',
      whiteSpace: 'nowrap',
      width: '100%',
      left: '0',
      gridArea: 'layer',
    });

    // Split text into characters
    const originalSplit = new SplitText(originalSpan, { type: 'chars' });
    const cloneSplit = new SplitText(cloneSpan, { type: 'chars' });

    // Initial positioning
    // gsap.set(cloneSpan, { position: 'absolute', top: '100%' });
    gsap.set([originalSplit.chars, cloneSplit.chars], { position: 'relative' });
    gsap.set(cloneSplit.chars, {
      yPercent: 150,
    });
    console.log(cloneSplit.chars);

    // Create timeline for hover animation
    const tl = gsap.timeline({ paused: true });

    tl.to(originalSplit.chars, {
      yPercent: -100,
      y: '-24px',
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.inOut',
    }).to(
      cloneSplit.chars,
      {
        yPercent: -100,
        y: '24px',
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.inOut',
      },
      '<0.1'
    );

    // Add hover events
    button.addEventListener('mouseenter', () => tl.play());
    button.addEventListener('mouseleave', () => tl.reverse());
  });
};
