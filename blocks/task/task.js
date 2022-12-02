export class Task {
  title = false;
  note = false;
  date = "";
  imgs = [];
  sync = false;
}

export function complete(elem) {
  elem.classList.add("task_completed");
}

export function uncomplete(elem) {}
