import { gsap } from 'gsap';
// import { SplitText } from 'gsap/all';
import SplitType from 'split-type';

// gsap.registerPlugin(SplitText);

export const homeMain = () => {
  const splitText = new SplitType('.hero_title2', { types: 'chars,words,lines', tagName: 'span' });
  const heroFigure1 = document.querySelector('.hero_figure-1');
  const heroFigure2 = document.querySelector('.hero_figure-2');
  gsap.set(splitText.lines, {
    overflow: 'hidden',
  });
  gsap.set(splitText.chars, {
    yPercent: 100,
  });

  // Ensure all words maintain inline-block display
  splitText.words?.forEach((word) => {
    word.style.display = 'inline-block';
    word.style.whiteSpace = 'normal';
  });

  // Make lines behave as blocks but preserve inline flow
  splitText.lines?.forEach((line) => {
    line.style.display = 'inline-block';
    line.style.whiteSpace = 'nowrap';
  });
  gsap.set(heroFigure1, {
    overflow: 'hidden',
  });
  const tl = gsap.timeline({
    defaults: {
      ease: (i) => 1 - Math.pow(1 - i, 4),
      duration: 1,
    },
  });
  tl.fromTo(
    heroFigure1!.querySelector('img'),
    {
      scale: 1.25,
    },
    {
      scale: 1,
    }
  )
    .fromTo(
      heroFigure2,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
      },
      '-=1'
    )
    .to(
      splitText.chars,
      {
        duration: 1,
        yPercent: 0,
        stagger: 0.025,
      },
      '-=.75'
    );
};
