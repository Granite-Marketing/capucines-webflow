import { gsap } from "gsap";

export const bookingModal = () => {    
    const modal = document.querySelector(".hero_booking-engine-wrapper");
    
    if (modal) {      
      const modalCloseButton = modal.querySelector(".close-modal");
      const modalOpenButton = document.querySelector(".open-modal");
      const overlay = modal.querySelector(".modal-overlay");
      let mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: 'screen and (max-width: 767px)',
          isDesktop: 'screen and (min-width: 768px)',
        },
        (context) => {
          let { isMobile, isDesktop } = context.conditions;

          if (isMobile) {
            closeModal();
          }

          if (isDesktop) {
            openModal();
          }
        }
      );
  
      function closeModal() {
        overlay.style.visibility = "hidden";        
        modal.style.visibility = "hidden";        
      }
  
      function openModal() {
        overlay.style.visibility = "visible";        
        modal.style.visibility = "visible";              
      }

      overlay.addEventListener("click", () => {
         closeModal();   
      });

      modalCloseButton.addEventListener("click", () => {
        closeModal();
      });

      modalOpenButton.addEventListener("click", () => {
        openModal();
      });        
    }
}