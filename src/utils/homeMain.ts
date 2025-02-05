import { gsap } from 'gsap';

// import SplitType from 'split-type';
import { nestedLineSplit } from './gsapNestedLineSplit';

export const homeMain = () => {
  console.log('homeMain');
  if (!document.querySelector('.section_hero')) return;
  const splitText = nestedLineSplit('.hero_title2', {
    types: 'lines,words,chars',
    tagName: 'span',
  });
  console.log(splitText);
  const heroFigure1 = document.querySelector('.hero_figure-1');
  const heroFigure2 = document.querySelector('.hero_figure-2');
  // gsap.set(splitText.lines, {
  //   overflow: 'hidden',
  // });
  // console.log(splitText);
  // gsap.set(splitText.chars, {
  //   yPercent: 100,
  // });

  // Ensure all words maintain inline-block display
  // splitText.words?.forEach((word) => {
  //   (word as HTMLElement).style.display = 'inline-block';
  //   (word as HTMLElement).style.whiteSpace = 'normal';
  // });

  // // Make lines behave as blocks but preserve inline flow
  // splitText.lines?.forEach((line) => {
  //   (line as HTMLElement).style.display = 'inline-block';
  //   (line as HTMLElement).style.whiteSpace = 'nowrap';
  // });
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
  ).fromTo(
    heroFigure2,
    {
      clipPath: 'inset(0% 0% 100% 0%)',
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
    },
    '-=1'
  );
  // .to(
  //   splitText.chars,
  //   {
  //     duration: 1,
  //     yPercent: 0,
  //     stagger: 0.025,
  //   },
  //   '-=.75'
  // );
};
