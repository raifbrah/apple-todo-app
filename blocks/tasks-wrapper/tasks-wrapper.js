import * as taskJS from "../task/task.js";

const tasks = {
  uncompleted: [],
  completed: [],
};

renderTasks("uncompleted", tasks.uncompleted);
renderTasks("completed", tasks.completed);
completedTasksCount_listener();
checkTaskDueDate(document.querySelectorAll(".task"));

export function addTask(elem) {
  tasks.uncompleted.push(elem);
  renderTasks("uncompleted", [elem]);
  checkTaskDueDate([
    document.querySelector(".tasks-wrapper__uncompleted .task:last-child"),
  ]);
}

export function renderTasks(tasksSection, tasksArrow) {
  let tasksWrapperSection = document.querySelector(
    `.tasks-wrapper__${tasksSection}`
  );

  tasksArrow.forEach((arrowTask) => {
    tasksWrapperSection.insertAdjacentHTML(
      "beforeend",
      `
      ${taskJS.parseArrowTask_to_html(arrowTask)}
      `
    );
  });
}

export function completedTasksCount_listener() {
  const completedTasksCount__count = document.querySelector(
    ".completed-tasks-count__count"
  );
  completedTasksCount__count.innerText = tasks.completed.length;
}

function checkTaskDueDate(tasksArrow) {
  tasksArrow.forEach((value, index) => {
    if (value.querySelector(".task__due-date")) {
      const taskDate = value.querySelector(".task__due-date");

      const taskYear = taskDate.innerText.slice(6, 10);
      const taskMonth = taskDate.innerText.slice(3, 5);
      const taskDay = taskDate.innerText.slice(0, 2);

      if (taskYear < new Date().getFullYear()) {
        value.classList.add("task_overdue");
      } else if (taskMonth < new Date().getMonth() + 1) {
        value.classList.add("task_overdue");
      } else if (taskDay < new Date().getDate()) {
        value.classList.add("task_overdue");
      } else {
        value.classList.remove("task_overdue");
      }
    }
  });
}

export function clearCompletedTasks() {
  const tasksWrapper__completed = document.querySelector(
    ".tasks-wrapper__completed"
  );

  tasks.completed = [];
  tasksWrapper__completed.innerHTML = "";
  completedTasksCount_listener();
}
