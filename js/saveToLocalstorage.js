import { tasks } from "../blocks/tasks-wrapper/tasks-wrapper.js";

export function saveTasksToLocalStorage(elem) {
  localStorage.tasks = JSON.stringify(elem);
}
