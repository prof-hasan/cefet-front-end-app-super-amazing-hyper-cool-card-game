let lastScrollY = 0;
let ticking = false;

function updateMask() {
  const hero = document.querySelector(".hero");
  hero.style.maskPosition = `0 ${lastScrollY}px`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateMask);
    ticking = true;
  }
});
