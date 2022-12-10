import * as taskJS from "../task/task.js";
import * as outgoingWrapper__input_for_titleJS from "./outgoing-wrapper__input/outgoing-wrapper__input_for_title.js";
import * as outgoingWrapper__contentJS from "./outgoing-wrapper__content/outgoing-wrapper__content.js";
import * as tasksWrapperJS from "../tasks-wrapper/tasks-wrapper.js";
import * as outgoingWrapper__filesContainerJS from "./&__files-container/outgoing-wrapper__files-container.js";

const outgoingWrapper = document.querySelector(".outgoing-wrapper");
const outgoingWrapper__content = document.querySelector(
  ".outgoing-wrapper__content"
);
const outgoingWrapper__header = document.querySelector(
  ".outgoing-wrapper__header"
);

const outgoingWrapper__INPUTS = document.querySelectorAll(
  ".outgoing-wrapper__input"
);
let outgointWrapper__dateInput = document.querySelector(
  "#outgoing-wrapper__date-input"
);
const shadowBg = document.querySelector(".shadow-bg");
const wrapper = document.querySelector(".wrapper");

outgointWrapper__dateInput.value = getDateForInputValue();

export function newTask() {
  outgoingWrapper.classList.remove("outgoing-wrapper_type_more-details");
  outgoingWrapper.classList.add("outgoing-wrapper_type_new-task");
  open();
}
export function addTask() {
  const outgoingWrapper__input_for_title = document.querySelector(
    ".outgoing-wrapper__input_for_title"
  );
  const outgoingWrapper__input_for_note = document.querySelector(
    ".outgoing-wrapper__input_for_note"
  );
  const outgoingWrapper__dateToggleSwitch = document.querySelector(
    ".outgoing-wrapper__item_for_task-date .toggle-switch"
  );
  outgointWrapper__dateInput = document.querySelector(
    "#outgoing-wrapper__date-input"
  );
  const outgoingWrapper__filesContainer = document.querySelector(
    ".outgoing-wrapper__files-container"
  );
  const outgoingWrapper__fileITEMS = document.querySelectorAll(
    ".outgoing-wrapper__file-item"
  );

  let task = new taskJS.Task();

  if (outgoingWrapper__input_for_title.innerHTML !== "") {
    task.title = outgoingWrapper__input_for_title.innerHTML;
  }
  if (outgoingWrapper__input_for_note.innerHTML !== "") {
    task.note = outgoingWrapper__input_for_note.innerHTML;
  }
  if (
    outgoingWrapper__dateToggleSwitch.classList.contains("toggle-switch_on")
  ) {
    task.date = outgointWrapper__dateInput.value;
  }
  if (outgoingWrapper__fileITEMS.length > 0) {
    outgoingWrapper__fileITEMS.forEach((elem) => {
      let imgSrc = elem.querySelector(".outgoing-wrapper__file-img").src;
      task.imgs.push(imgSrc);
    });
  }

  tasksWrapperJS.addTask(task);

  close();
}

export function editTask(thisTaskRight) {
  const outgoingWrapper__input_for_title = document.querySelector(
    ".outgoing-wrapper__input_for_title"
  );
  const outgoingWrapper__input_for_note = document.querySelector(
    ".outgoing-wrapper__input_for_note"
  );
  const outgoingWrapper__dateToggleSwitch = document.querySelector(
    ".outgoing-wrapper__item_for_task-date .toggle-switch"
  );
  outgointWrapper__dateInput = document.querySelector(
    "#outgoing-wrapper__date-input"
  );
  const outgoingWrapper__filesContainer = document.querySelector(
    ".outgoing-wrapper__files-container"
  );

  const thisArrowTask = taskJS.parseHtmlTask_to_arrow(
    thisTaskRight.parentNode.parentNode
  );

  outgoingWrapper__input_for_title.innerText = thisArrowTask.title;
  if (thisArrowTask.note) {
    outgoingWrapper__input_for_note.innerText = thisArrowTask.note;
  }
  if (thisArrowTask.date) {
    outgointWrapper__dateInput.value = thisArrowTask.date;
    outgoingWrapper__dateToggleSwitch.classList.add("toggle-switch_on");
  }
  if (thisArrowTask.imgs.length > 0) {
    outgoingWrapper__filesContainer.innerHTML =
      outgoingWrapper__filesContainerJS.parseImgLinksArrow_to_html(
        thisArrowTask.imgs
      );
  }

  open();
}
export function saveTask() {
  close();
}

function open() {
  const outgoingWrapper__input_for_title = document.querySelector(
    ".outgoing-wrapper__input_for_title"
  );

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
  const outgoingWrapper__input_for_title = document.querySelector(
    ".outgoing-wrapper__input_for_title"
  );

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
  const outgoingWrapper__dateToggleSwitch = document.querySelector(
    ".outgoing-wrapper__item_for_task-date .toggle-switch"
  );
  outgointWrapper__dateInput = document.querySelector(
    "#outgoing-wrapper__date-input"
  );
  const outgoingWrapper__filesContainer = document.querySelector(
    ".outgoing-wrapper__files-container"
  );

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

  if (new Date().getMonth() + 1 < 10) {
    dateForInput += 0;
  }

  dateForInput += new Date().getMonth() + 1;
  dateForInput += "-";

  if (new Date().getDate() + 1 < 10) {
    dateForInput += 0;
  }

  dateForInput += new Date().getDate() + 1;

  return dateForInput;
}
