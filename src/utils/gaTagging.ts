export const gaTagging = () => {
  // Initialize data layer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // for listing pages
  const targetLinks = document.querySelectorAll('[ga4]');
  if (targetLinks) {
    targetLinks.forEach((link, index) => {
      const gaTarget = link.getAttribute('ga4');
      if (!gaTarget) return;
      link.setAttribute(gaTarget, '');      
      const sectionClass = getSectionClass(link as HTMLElement, index + 1);
      console.log(sectionClass);
      // Add click listener
      link.addEventListener('click', (e) => {
        const element = e.currentTarget as HTMLElement;
        window.dataLayer.push({
          'event': 'book_now_click',
          'buttonText': element.textContent?.trim() || '',
          'buttonURL': (element as HTMLAnchorElement).href || '',
          'buttonID': element.id || '',
          'buttonClass': element.className,
          'section': sectionClass,
          'trackingAttribute': gaTarget
        });
      });
    });
  }

  // Get the data-page attribute value from the page
  const pageGaValue = document.querySelector('[data-page]')?.getAttribute('data-page');
  if (!pageGaValue) return;

  const pageName = pageGaValue.split('-').pop();
  const navBookingButton = document.querySelector('[book-nav]');

  // update nav booking data attribute and add tracking
  if (navBookingButton) {
    const trackingAttr = `book-room-${pageName}-nav`;
    navBookingButton.setAttribute(trackingAttr, '');
    navBookingButton.removeAttribute('book-nav');
    const sectionClass = getSectionClass(navBookingButton as HTMLElement, 1);
    console.log(sectionClass);
    
    navBookingButton.addEventListener('click', (e) => {
      const element = e.currentTarget as HTMLElement;
      window.dataLayer.push({
        'event': 'book_now_click',
        'buttonText': element.textContent?.trim() || '',
        'buttonURL': (element as HTMLAnchorElement).href || '',
        'buttonID': element.id || '',
        'buttonClass': element.className,
        'section': sectionClass,
        'trackingAttribute': trackingAttr,
      });
    });
  }

  // detail pages booking button targets
  const bookNowButtons = document.querySelectorAll('[ga4-inner]');

  // Set the attribute on all Book Now buttons and add tracking
  let i = 1;
  bookNowButtons.forEach((button) => {
    const trackingAttr = `book-room-${pageName}-sec${i}`;
    button.setAttribute(trackingAttr, '');
    const sectionClass = getSectionClass(button as HTMLElement, i);
    console.log(sectionClass);
    
    button.addEventListener('click', (e) => {
      const element = e.currentTarget as HTMLElement;
      window.dataLayer.push({
        'event': 'book_now_click',
        'buttonText': element.textContent?.trim() || '',
        'buttonURL': (element as HTMLAnchorElement).href || '',
        'buttonID': element.id || '',
        'buttonClass': element.className,
        'section': sectionClass,
        'trackingAttribute': trackingAttr,
      });
    });
    
    i++;
  });
};

// Get section class
function getSectionClass(link: HTMLElement, index : number) {
  const section = link.closest('section') || link.closest('header');
  if (section) {
    const sectionClass = section.getAttribute('class')?.split(' ')[0] || '';
    const sectionClassWithIndex = `${sectionClass}-${index}`;
    return sectionClassWithIndex;
  }
}

// Add TypeScript type definition for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}