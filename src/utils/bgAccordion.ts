export const bgAccordion = () => {
  // `.bg-accordion_item-radio-field.fs-cmsfilter_active~.bg-accordion_names-article .bg-accordion_item-sizer`;
  const section = document.querySelector('.section_bg-accordion');
  if (!section) return;
  const sizers = section.querySelectorAll('.bg-accordion_item-sizer');
  section.addEventListener('click', (e) => {
    const item = e.target.closest('.bg-accordion_names-item');
    if (!item) return;
    const label = item.querySelector('.bg-accordion_item-radio-field');
    if (!label) return;
    const sizer = item.querySelector('.bg-accordion_item-sizer');
    if (!sizer) return;

    const closable = section.getAttribute('accordion-closable');
    const x = e.target.closest('.bg-accordion_item-x');
    // if (closable && window.innerWidth <= 767 && x) {
    //   // const radio = item.querySelector('input[type=radio]');
    //   // radio?.removeAttribute('checked');
    //   // const closer = section.querySelector('input[type=radio].bg-accordion_item-closer');
    //   // console.log(closer);
    //   // closer?.setAttribute('checked', 'checked');
    //   // console.log('hello');
    // }

    if (x) {
      console.log('x');
      sizers.forEach((s) => {
        s.style.height = '0px';
      });
    } else if (!label.classList.contains('fs-cmsfilter_active')) {
      sizers.forEach((s) => {
        s.style.height = '0px';
      });
      const paragraph = item.querySelector('.bg-accordion_item-paragraph');
      if (!paragraph) return;
      const height = paragraph.getBoundingClientRect().height;
      sizer.style.height = String(height) + 'px';
    }
  });
};
