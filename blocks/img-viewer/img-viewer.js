const imgViewer = document.querySelector(".img-viewer");
const imgViewer__img = document.querySelector(".img-viewer__img");
const shadowBg = document.querySelector(".shadow-bg");

const transitionDelay = 300;
let startPositionY = null;
let currentPositionY = null;

export function open(img) {
  shadowBg.style.zIndex = "1400";
  shadowBg.style.visibility = "visible";
  shadowBg.style.pointerEvents = "auto";
  shadowBg.style.transition = `${transitionDelay}ms`;
  shadowBg.style.opacity = ".9";

  imgViewer__img.src = img.src;
  imgViewer__img.style.transition = `${transitionDelay}ms`;
  imgViewer.classList.add("img-viewer_open");
  imgViewer.style.visibility = "visible";
  imgViewer__img.style.transform = "translateY(-50%)";

  setTimeout(() => {
    imgViewer__img.addEventListener("touchstart", touchStart);
    imgViewer__img.addEventListener("touchmove", touchMove);
    imgViewer__img.addEventListener("touchend", touchEnd);

    imgViewer__img.style.pointerEvents = "auto";
  }, transitionDelay);
}

function close() {
  shadowBg.style.pointerEvents = "none";
  shadowBg.style.opacity = "0";
  imgViewer__img.style.transform = "translateY(100%)";

  setTimeout(() => {
    imgViewer.style.visibility = "hidden";
    shadowBg.style.visibility = "hidden";
    shadowBg.style.transition = "0s";
    shadowBg.style.zIndex = "900";
    imgViewer__img.style.transition = "0s";
  }, transitionDelay);

  imgViewer.classList.remove("img-viewer_open");
  imgViewer__img.removeEventListener("touchstart", touchStart);
  imgViewer__img.removeEventListener("touchmove", touchMove);
  imgViewer__img.removeEventListener("touchend", touchEnd);
}

function touchStart(e) {
  startPositionY = e.changedTouches[0].clientY;
  currentPositionY = e.changedTouches[0].clientY;

  imgViewer__img.style.transition = "0s";
}
function touchMove(e) {
  currentPositionY = e.changedTouches[0].clientY;

  imgViewer__img.style.transform = `translateY(calc(-50% - ${
    startPositionY - currentPositionY
  }px))`;
}
function touchEnd(e) {
  imgViewer__img.style.transition = `${transitionDelay}ms`;

  if (Math.abs(startPositionY - currentPositionY) > 100) {
    close();
  } else {
    imgViewer__img.style.transform = "translateY(-50%)";
  }

  startPositionY = null;
  currentPositionY = null;
}
