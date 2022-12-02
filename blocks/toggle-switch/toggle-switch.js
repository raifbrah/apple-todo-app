import * as outgoingWrapperJS from "../outgoing-wrapper/outgoing-wrapper.js";

export function toggle(elem) {
  outgoingWrapperJS.getTask();

  if (elem.classList.contains("toggle-switch_on")) {
  } else {
  }

  elem.classList.toggle("toggle-switch_on");
}
