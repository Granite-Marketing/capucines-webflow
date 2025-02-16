export const gaTagging = () => {
    // for listing pages
    const targetLinks = document.querySelectorAll('[ga4]');
    if (targetLinks) {        
        targetLinks.forEach((link) => {
          const gaTarget = link.getAttribute('ga4')
          link.setAttribute(gaTarget, '');
        });  
    }
    // Get the data-page attribute value from the page
    const pageGaValue = document.querySelector('[data-page]')?.getAttribute('data-page');
    
    if (!pageGaValue) return;

    // detail pages
    const bookNowButtons = document.querySelectorAll('[ga4-inner]');

    // Set the attribute on all Book Now buttons
    let i = 1;
    bookNowButtons.forEach((button) => {
        const pageName = pageGaValue.split('-').pop();                
        button.setAttribute(`book-room-${pageName}-sec${i}`, '');
        i++;
    });
};
