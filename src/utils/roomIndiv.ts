export const roomIndiv = () => {
  const button = document.querySelector("[func='show-room-details");
  const section = document.querySelector('.section_room-detail');
  const close = section?.querySelector('.overlay-close-button');

  button?.addEventListener('click', () => {
    if (!section) return;
    section.style.display = 'block';
    void section.offsetWidth;
    section.style.pointerEvents = 'auto';
    section.style.opacity = 1;
  });

  close?.addEventListener('click', () => {
    if (!section) return;
    section.classList.remove('.is-shown');
    section.style.pointerEvents = 'none';
    section.style.opacity = 0;

    setTimeout(() => {
      const section = document.querySelector('.section_room-detail');
      if (!section) return;
      section.style.display = 'none';
    }, 800);
  });
};
