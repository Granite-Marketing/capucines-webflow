export const adjustSubLinks = () => {
  const navSubList = document.querySelector('.nav_list-sub');
  navSubList.style.position = 'fixed';
  navSubList.style.bottom = '0';
  navSubList.style.pointerEvents = 'none';

  const navSubLinks = navSubList?.querySelectorAll('.nav_list-sub-link');
  console.log(navSubList);
  if (!navSubLinks?.length) return;
  if (navSubLinks.length % 2 === 1) {
    const centerLink = navSubLinks[Math.ceil(navSubLinks.length / 2) - 1];
    console.log(centerLink.innerText);
    const rect = centerLink.getBoundingClientRect();
    const left = window.innerWidth / 2 - (rect.left + rect.width / 2);
    console.log(rect);
    // navSubList.style.marginLeft = String(Math.round(left * 100) / 100) + 'px';
  }
};
