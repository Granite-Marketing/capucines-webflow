export const roomIndiv = () => {
  const button = document.querySelector("[func='show-room-details");
  const section = document.querySelector('.section_room-detail');
  if (!section) return;
  const close = section?.querySelector('.overlay-close-button');
  const overlay = section?.querySelector('.overlay.room-detail_overlay');
  const article = section?.querySelector('.room-detail_component');
  if (!close || !overlay || !article) return;

  button?.addEventListener('click', () => {
    article.style.transform = 'translate(0%)';
    // overlay.style.display = 'block';
    // void overlay.offsetWidth;
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = 1;
  });

  close?.addEventListener('click', () => {
    closeModal();
  });
  overlay?.addEventListener('click', () => {
    closeModal();
  });

  function closeModal() {
    article.style.transform = 'translateX(100%)';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = 0;

    // setTimeout(() => {
    //   const section = document.querySelector('.section_room-detail');
    //   if (!section) return;
    //   section.style.display = 'none';
    // }, 800);
  }
};
