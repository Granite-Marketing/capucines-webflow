import { gsap } from 'gsap';
import SplitType from 'split-type';
// import Splitting from 'splitting';
// This an attempt to split the text but it doesn't work
// import { nestedLineSplit } from './gsapNestedLineSplit';

// gsap.registerPlugin(SplitType);

export const homeMain = () => {
  if (!document.querySelector('.section_hero')) return;

  // This an attempt to split the text but it doesn't work
  // const heroTitle = document.querySelector('.hero_title2');
  // if (heroTitle) {
  //   const hasChildElements = heroTitle.children.length > 0;
  //   if (hasChildElements) {
  //     Array.from(heroTitle.children).map((child) => child.classList.add('hero_title2'));
  //   }
  // }

  // const split = Splitting({
  //   target: '.hero_title2',
  //   by: 'lines',
  // });
  const splitText = new SplitType('.hero_title2', {
    types: 'lines,words,chars',
  });

  // Get the target element
  // const heroTitle = document.querySelector('.hero_title2');
  // console.log(split);
  // if (heroTitle && split[0]?.lines) {
  //   // Clear the original content
  //   heroTitle.textContent = '';

  //   // Create spans for each line and append them
  //   split[0].lines.forEach((lineElements: HTMLElement[]) => {
  //     const span = document.createElement('span');
  //     span.classList.add('line');
  //     gsap.set(span, {
  //       display: 'inline-block',
  //     });
  //     span.innerHTML = lineElements
  //       .map((el) => {
  //         const wordSpan = document.createElement('span');
  //         wordSpan.classList.add('word');
  //         wordSpan.textContent = el.textContent;
  //         return wordSpan.outerHTML;
  //       })
  //       .join(' ');
  //     heroTitle.appendChild(span);
  //   });
  // }

  const heroFigure1 = document.querySelector('.hero_figure-1');
  const heroFigure2 = document.querySelector('.hero_figure-2');
  gsap.set(splitText.lines, {
    overflow: 'hidden',
  });

  gsap.set(splitText.chars, {
    yPercent: 100,
  });

  splitText.words?.forEach((word) => {
    (word as HTMLElement).style.display = 'inline-block';
    (word as HTMLElement).style.whiteSpace = 'normal';
  });

  splitText.lines?.forEach((line) => {
    (line as HTMLElement).style.display = 'inline-block';
    (line as HTMLElement).style.whiteSpace = 'nowrap';
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
