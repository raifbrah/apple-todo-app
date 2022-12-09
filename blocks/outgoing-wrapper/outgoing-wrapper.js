import * as taskJS from "../task/task.js";
import * as outgoingWrapper__input_for_titleJS from "./outgoing-wrapper__input/outgoing-wrapper__input_for_title.js";
import * as outgoingWrapper__contentJS from "./outgoing-wrapper__content/outgoing-wrapper__content.js";

const outgoingWrapper = document.querySelector(".outgoing-wrapper");
const outgoingWrapper__content = document.querySelector(
  ".outgoing-wrapper__content"
);
const outgoingWrapper__header = document.querySelector(
  ".outgoing-wrapper__header"
);
const outgoingWrapper__input_for_title = document.querySelector(
  ".outgoing-wrapper__input_for_title"
);
const outgoingWrapper__INPUTS = document.querySelectorAll(
  ".outgoing-wrapper__input"
);
const outgointWrapper__dateInput = document.querySelector(
  "#outgoing-wrapper__date-input"
);
const outgoingWrapper__dateToggleSwitch = document.querySelector(
  ".outgoing-wrapper__item_for_task-date .toggle-switch"
);
const outgoingWrapper__filesContainer = document.querySelector(
  ".outgoing-wrapper__files-container"
);
const shadowBg = document.querySelector(".shadow-bg");
const wrapper = document.querySelector(".wrapper");

let task = new taskJS.Task();

outgointWrapper__dateInput.value = getDateForInputValue();

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

export function addTask() {
  close();
}
export function saveTask() {
  close();
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

  outgoingWrapper__content.addEventListener(
    "scroll",
    outgoingWrapper__contentJS.onScroll
  );
  outgoingWrapper__input_for_title.addEventListener(
    "input",
    outgoingWrapper__input_for_titleJS.onChange
  );
}
export function close() {
  shadowBg.style.pointerEvents = "none";
  shadowBg.style.opacity = "0";
  shadowBg.removeEventListener("click", close);

  wrapper.style.transform = "none";
  wrapper.style.borderRadius = "0";

  setTimeout(() => {
    if (outgoingWrapper.classList.contains("outgoing-wrapper_open") !== true) {
      shadowBg.style.visibility = "hidden";
      shadowBg.style.transition = "0ms";

      wrapper.style.transition = "0ms";
    }

    resetAll();
  }, 600);

  outgoingWrapper.classList.remove("outgoing-wrapper_open");

  outgoingWrapper__content.removeEventListener(
    "scroll",
    outgoingWrapper__contentJS.onScroll
  );
  outgoingWrapper__input_for_title.removeEventListener(
    "input",
    outgoingWrapper__input_for_titleJS.onChange
  );
}

function resetAll() {
  outgoingWrapper__INPUTS.forEach((element) => {
    element.innerHTML = "";
  });

  outgointWrapper__dateInput.value = getDateForInputValue();
  outgoingWrapper__dateToggleSwitch.classList.remove("toggle-switch_on");
  outgoingWrapper__filesContainer.innerHTML = "";
}

function getDateForInputValue() {
  let dateForInput = "";

  dateForInput += new Date().getFullYear();
  dateForInput += "-";

  if (new Date().getMonth() < 10) {
    dateForInput += 0;
  }

  dateForInput += new Date().getMonth();
  dateForInput += "-";

  if (new Date().getDate() + 1 < 10) {
    dateForInput += 0;
  }

  dateForInput += new Date().getDate() + 1;

  return dateForInput;
}
