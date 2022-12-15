import * as taskJS from "../task/task.js";

export let tasks = {
  uncompleted: [],
  completed: [],
};

if (await localforage.getItem("tasks")) {
  tasks = await localforage.getItem("tasks");
}

renderTasks("uncompleted", tasks.uncompleted);
renderTasks("completed", tasks.completed);
completedTasksCount_listener();
taskMarkCompletion_toggleOn();
checkTaskDueDate(document.querySelectorAll(".task"));

export function addTask(elem) {
  tasks.uncompleted.push(elem);
  renderTasks("uncompleted", [elem]);
  checkTaskDueDate([
    document.querySelector(".tasks-wrapper__uncompleted .task:last-child"),
  ]);
  localforage.setItem("tasks", tasks);
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
      checkTaskDueDate([
        tasksWrapper__uncompleted.querySelectorAll(".task")[indexOfTask],
      ]);
    }, 100);
  } else if (parentNodeOfTask === tasksWrapper__completed) {
    tasks.completed[indexOfTask] = ArrowTask;
    setTimeout(() => {
      checkTaskDueDate([
        tasksWrapper__completed.querySelectorAll(".task")[indexOfTask],
      ]);
    }, 100);
  }
  localforage.setItem("tasks", tasks);
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

  addSwipeDeleteListeners();
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
  localforage.setItem("tasks", tasks);
}

function taskMarkCompletion_toggleOn() {
  const completedTasks = document.querySelectorAll(
    ".tasks-wrapper__completed .task"
  );

  completedTasks.forEach((value) => {
    value.classList.add("task_completed");
  });
}

export function complete_or_uncomplete(htmlTask) {
  const tasksWrapper__uncompleted = document.querySelector(
    ".tasks-wrapper__uncompleted"
  );
  const tasksWrapper__completed = document.querySelector(
    ".tasks-wrapper__completed"
  );

  let taskIndexInSection;

  htmlTask.parentNode.querySelectorAll(".task").forEach((value, i) => {
    if (value === htmlTask) {
      taskIndexInSection = i;
    }
  });

  htmlTask.classList.toggle("task_completed");

  const newHtmlTask = htmlTask.cloneNode(true);

  if (htmlTask.parentNode === tasksWrapper__uncompleted) {
    htmlTask.remove();
    tasksWrapper__completed.appendChild(newHtmlTask);

    tasks.completed.push(tasks.uncompleted[taskIndexInSection]);
    tasks.uncompleted.splice(taskIndexInSection, 1);
  } else if (htmlTask.parentNode === tasksWrapper__completed) {
    htmlTask.remove();
    tasksWrapper__uncompleted.appendChild(newHtmlTask);

    tasks.uncompleted.push(tasks.completed[taskIndexInSection]);
    tasks.completed.splice(taskIndexInSection, 1);
  }

  completedTasksCount_listener();
  addSwipeDeleteListeners();
  localforage.setItem("tasks", tasks);
}

function addSwipeDeleteListeners() {
  const TASKS__CONTENTS = document.querySelectorAll(".task__content");
  const serction__content = document.querySelector(".section__content");

  let transitionDelay = 300;

  TASKS__CONTENTS.forEach((htmlTask) => {
    const task__deleteBg =
      htmlTask.parentNode.querySelector(".task__delete-bg");

    let startPositionX = null;
    let currentPositionX = null;

    let startPositionY = null;
    let currentPositionY = null;

    let positionY_is_changed = false;
    let positionX_is_started = false;

    let taskIsReadyToBeDeleted = false;

    htmlTask.ontouchstart = (e) => {
      htmlTask.addEventListener("touchmove", touchMove);
      htmlTask.addEventListener("touchend", touchEnd);
      htmlTask.style.willChange = "transform";
      htmlTask.style.transition = "0s";
      htmlTask.parentNode.style.willChange = "height";
      htmlTask.parentNode.style.height = `${htmlTask.parentNode.offsetHeight}px`;
      task__deleteBg.style.willChangel = "background-color";

      startPositionX = e.changedTouches[0].clientX;
      startPositionY = e.changedTouches[0].clientY;
    };

    function touchMove(e) {
      currentPositionX = e.changedTouches[0].clientX;
      currentPositionY = e.changedTouches[0].clientY;

      if (
        positionY_is_changed === false &&
        Math.abs(startPositionX - currentPositionX) > 20
      ) {
        positionX_is_started = true;
        serction__content.style.overflowY = "hidden";
        htmlTask.style.transform = `translateX(-${
          startPositionX - currentPositionX - 20
        }px)`;

        if (Math.abs(startPositionX - currentPositionX) > 150) {
          taskIsReadyToBeDeleted = true;
          htmlTask.parentNode.classList.add("task_ready-to-delete");
        } else {
          taskIsReadyToBeDeleted = false;
          htmlTask.parentNode.classList.remove("task_ready-to-delete");
        }
      }
      if (
        Math.abs(startPositionY - currentPositionY) > 20 &&
        positionX_is_started === false
      ) {
        positionY_is_changed = true;
        htmlTask.style.transform = "translateX(0)";
      }
    }

    function touchEnd(e) {
      htmlTask.style.transition = `transform ${transitionDelay}ms`;
      if (taskIsReadyToBeDeleted) {
        htmlTask.style.transform = "translate(-100%)";
        htmlTask.parentNode.style.minHeight = "0";
        htmlTask.parentNode.style.height = "0";

        htmlTask.parentNode.parentNode
          .querySelectorAll(".task__content")
          .forEach((value, i) => {
            if (htmlTask === value) {
              setTimeout(() => {
                removeTask(htmlTask.parentNode.parentNode, i);
              }, transitionDelay);
            }
          });
      } else {
        htmlTask.parentNode.style.height = "";
        htmlTask.style.transform = "translate(0)";
      }

      setTimeout(() => {
        htmlTask.style.transition = "0s";
      }, transitionDelay);

      serction__content.style.overflowY = "auto";
      htmlTask.removeEventListener("touchmove", touchMove);
      htmlTask.removeEventListener("touchend", touchEnd);
      htmlTask.style.willChange = "";
      htmlTask.parentNode.style.willChange = "";
      task__deleteBg.style.willChangel = "";

      startPositionX = null;
      currentPositionX = null;

      startPositionY = null;
      currentPositionY = null;

      positionY_is_changed = false;
      positionX_is_started = false;

      taskIsReadyToBeDeleted = false;
    }
  });
}

function removeTask(taskParent, taskId) {
  taskParent.querySelectorAll(".task")[taskId].remove();

  if (taskParent.classList.contains("tasks-wrapper__uncompleted")) {
    tasks.uncompleted.splice(taskId, 1);
  } else {
    tasks.completed.splice(taskId, 1);
    completedTasksCount_listener();
  }

  localforage.setItem("tasks", tasks);
}
