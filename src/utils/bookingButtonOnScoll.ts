import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const bookingButtonOnScroll = () => {
    const bookingButton = document.querySelector("#floating-button");
    
    if (!bookingButton) return;

    // Set initial opacity
    gsap.set(bookingButton, { opacity: 0, visibility: "hidden" });    

    // Create the scroll-triggered animation
    gsap.to(bookingButton, {
        opacity: 1,
        visibility: "visible",
        scrollTrigger: {
            trigger: ".page-wrapper",
            start: "top top-=200",
            toggleActions: "play none none reverse",
        }
    });
}