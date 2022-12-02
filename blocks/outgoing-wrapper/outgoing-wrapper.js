import * as taskJS from "../task/task.js";

const outgoingWrapper = document.querySelector(".outgoing-wrapper");
const shadowBg = document.querySelector(".shadow-bg");
const wrapper = document.querySelector(".wrapper");

let task = new taskJS.Task();


export function getTask() {
  return task;
}

export function newTask() {
  outgoingWrapper.classList.remove("outgoing-wrapper_type_more-details");
  outgoingWrapper.classList.add("outgoing-wrapper_type_new-task");
  open();
}

export function editTask(elem) {
  task = elem;
  open();
}

function open() {
  shadowBg.style.visibility = "visible";
  shadowBg.style.pointerEvents = "auto";
  shadowBg.style.transition = "opacity 600ms";
  shadowBg.style.opacity = ".3";

  shadowBg.addEventListener("click", close);

  wrapper.style.transition = `transform 600ms cubic-bezier(0.4, 1.1, 0.3, 1),
                              border-radius 600ms cubic-bezier(0.4, 1.1, 0.3, 1)`;
  wrapper.style.transform = "translateY(80px) scale(.9)";
  wrapper.style.borderRadius = "9px";

  outgoingWrapper.classList.add("outgoing-wrapper_open");
}
export function close() {
  shadowBg.style.pointerEvents = "none";
  shadowBg.style.opacity = "0";
  shadowBg.removeEventListener("click", close);

  wrapper.style.transform = "none";
  wrapper.style.borderRadius = "0";

  setTimeout(() => {
    shadowBg.style.visibility = "hidden";
    shadowBg.style.transition = "0ms";

    wrapper.style.transition = "0ms";
  }, 600);

  outgoingWrapper.classList.remove("outgoing-wrapper_open");
}
