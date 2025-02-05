import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const stickySection = () => {
  const stickySections = document.querySelector('.section_sticky-hero .section-sizer');
  const stickyImages = document.querySelectorAll('.sticky-hero_item-figure');
  const checkPoints = document.querySelectorAll(
    '.sticky-hero_pagination .sticky-hero_pagination-bullet'
  );

  const imagesArray = Array.from(stickyImages).reverse();
  const checkPointsArray = Array.from(checkPoints).reverse();

  gsap.set(imagesArray, { opacity: 0 });
  gsap.set(imagesArray[0], { opacity: 1 }); // Make last image visible initially
  gsap.set(checkPointsArray, { backgroundColor: 'transparent' });
  gsap.set(checkPointsArray[0], { backgroundColor: '#FFFFFF' }); // Make last checkpoint white initially

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stickySections,
      end: '+=400%',
      pin: true,
      markers: true,
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
        checkPointsArray[index],
        {
          backgroundColor: 'transparent',
          duration: stepDuration,
        },
        '<'
      );
      tl.to(
        checkPointsArray[index + 1],
        {
          backgroundColor: '#FFFFFF',
          duration: stepDuration,
        },
        '<'
      );
    }
  });
};
