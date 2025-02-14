import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const stickySection = () => {
  const stickySections = document.querySelector('.section_sticky-hero');
  const stickyImages = document.querySelectorAll('.sticky-hero_item-figure');
  const checkPoint = document.querySelector(
    '.sticky-hero_pagination .sticky-hero_pagination-bullet'
  );
  const cloneLength = stickyImages.length - 1;
  // duplicate the checkPoints to be as much as the stickyImages
  if (cloneLength === 1) {
    checkPoint?.parentNode?.removeChild(checkPoint);
  } else {
    for (let i = 0; i < cloneLength; i++) {
      const clone = checkPoint?.cloneNode(true);
      if (clone) {
        checkPoint?.parentNode?.appendChild(clone);
      }
    }
  }

  const newCheckPoints = document.querySelectorAll(
    '.sticky-hero_pagination .sticky-hero_pagination-bullet'
  );

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const imagesArray = Array.from(stickyImages).reverse();

    gsap.set(imagesArray, { opacity: 0 });
    gsap.set(imagesArray[0], { opacity: 1 }); // Make last image visible initially
    gsap.set(newCheckPoints, { backgroundColor: 'transparent' });
    gsap.set(newCheckPoints[0], { backgroundColor: '#FFFFFF' }); // Make last checkpoint white initially

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickySections,
        end: '+=400%',
        pin: true,
        markers: false,
        scrub: true,
      },
    });

    // Calculate duration for each image transition
    const stepDuration = 1 / (imagesArray.length - 1);

    imagesArray.forEach((img, index) => {
      if (index < imagesArray.length - 1) {
        // Skip the first image (last in original order)
        tl.to(img, {
          opacity: 0,
          duration: stepDuration,
        });
        tl.to(
          imagesArray[index + 1],
          {
            opacity: 1,
            duration: stepDuration,
          },
          '<'
        );

        tl.to(
          newCheckPoints[index],
          {
            backgroundColor: 'transparent',
            duration: stepDuration,
          },
          '<'
        );
        tl.to(
          newCheckPoints[index + 1],
          {
            backgroundColor: '#FFFFFF',
            duration: stepDuration,
          },
          '<'
        );
      }
    });
  });
};
