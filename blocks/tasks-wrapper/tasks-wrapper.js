import * as taskJS from "../task/task.js";

const tasks = {
  uncompleted: [],
  completed: [],
};

/* TEST - start  МОЖНО УДАЛИТЬ*/
let myTestTask = new taskJS.Task();
myTestTask.title = "Test task title";
myTestTask.date = "2022-12-01";

let myTestTask2 = new taskJS.Task();
myTestTask2.title = "Test task tho title";
myTestTask2.note = "my test note";
myTestTask2.date = "2022-12-01";

tasks.uncompleted.push(myTestTask);
tasks.uncompleted.push(myTestTask2);
/* TEST - end  МОЖНО УДАЛИТЬ*/

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

export function replaceTask(parentNodeOfTask, indexOfTask, ArrowTask) {
  const tasksWrapper__uncompleted = document.querySelector(
    ".tasks-wrapper__uncompleted"
  );
  const tasksWrapper__completed = document.querySelector(
    ".tasks-wrapper__completed"
  );

  if (parentNodeOfTask === tasksWrapper__uncompleted) {
    tasks.uncompleted[indexOfTask] = ArrowTask;

    setTimeout(() => {
      console.log(tasks.uncompleted);
      checkTaskDueDate([
        tasksWrapper__uncompleted.querySelectorAll(".task")[indexOfTask],
      ]);
    }, 200);
  } else if (parentNodeOfTask === tasksWrapper__completed) {
    tasks.completed[indexOfTask] = ArrowTask;
    checkTaskDueDate([
      tasksWrapper__completed.querySelectorAll(".task")[indexOfTask],
    ]);
  }
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

function checkTaskDueDate(htmlTasksArrow) {
  htmlTasksArrow.forEach((value) => {
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
