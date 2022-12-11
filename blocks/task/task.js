export class Task {
  title = false;
  note = false;
  date = false;
  imgs = [];
  sync = false;
}

/* ==========================
== Task components - START */
export function title(text) {
  return `<div class="task__title" onclick="outgoingWrapperJS.editTask(this.parentNode.parentNode.parentNode)">${text}</div>`;
}
export function note(text) {
  return `<div class="task__note" onclick="outgoingWrapperJS.editTask(this.parentNode.parentNode.parentNode)">${text}</div>`;
}
export function date(taskDate) {
  return `
    <div class="task__properties" onclick="outgoingWrapperJS.editTask(this.parentNode.parentNode.parentNode)">
      <div class="task__due-date">
        ${taskDate.slice(8, 10)}.${taskDate.slice(5, 7)}.${taskDate.slice(0, 4)}
      </div>
    </div>
  `;
}
export function imgsSlider(imgLinksArray) {
  let sliderStart = '<div class="task__imgs-slider">';

  imgLinksArray.forEach((imgLink) => {
    sliderStart += `
      <div class="outgoing-wrapper__file-img-container">
        <img class="outgoing-wrapper__file-background" src="./img/mini-icons/img-icon.svg" alt="image icon">
        <img src="${imgLink}" alt="" class="outgoing-wrapper__file-img">
      </div>
    `;
  });

  sliderStart += "</div>";

  return sliderStart;
}
/* Task components - END ==
=========================*/

export function parseArrowTask_to_html(arrowTask) {
  let taskStart = `
    <div class="task">
      <div class="task__delete-bg">
        <i class="task__trash-icon"></i>
      </div>
      <div class="task__content">
        <div class="task__left">
          <button class="mark" onclick="tasksWrapperJS.complete_or_uncomplete(this.parentNode.parentNode.parentNode)"></button>
        </div>
        <div class="task__right">
  `;

  if (arrowTask.title) {
    taskStart += title(arrowTask.title);
  }
  if (arrowTask.note) {
    taskStart += note(arrowTask.note);
  }
  if (arrowTask.date) {
    taskStart += date(arrowTask.date);
  }
  if (arrowTask.imgs.length > 0) {
    taskStart += imgsSlider(arrowTask.imgs);
  }

  taskStart += `
        </div>
      </div>
    </div>
  `;

  return taskStart;
}

export function parseHtmlTask_to_arrow(htmlTask) {
  let thisArrowTask = new Task();

  thisArrowTask.title = htmlTask.querySelector(".task__title").innerText;

  if (htmlTask.querySelector(".task__note")) {
    thisArrowTask.note = htmlTask.querySelector(".task__note").innerText;
  }
  if (htmlTask.querySelector(".task__due-date")) {
    thisArrowTask.date = parseHtmlTaskDueDate_to_inputDateValue(
      htmlTask.querySelector(".task__due-date")
    );
  }
  if (htmlTask.querySelector(".task__imgs-slider")) {
    thisArrowTask.imgs = parseHtmlTaskImgsSlider_to_imgLinksArrow(
      htmlTask.querySelector(".task__imgs-slider")
    );
  }

  return thisArrowTask;
}

export function parseHtmlTaskDueDate_to_inputDateValue(htmlTaskDueDate) {
  let inputDateValue = "";

  inputDateValue += htmlTaskDueDate.innerText.slice(6, 10);
  inputDateValue += "-";
  inputDateValue += htmlTaskDueDate.innerText.slice(3, 5);
  inputDateValue += "-";
  inputDateValue += htmlTaskDueDate.innerText.slice(0, 2);

  return inputDateValue;
}

export function parseHtmlTaskImgsSlider_to_imgLinksArrow(htmlTaskImgsSlider) {
  const fileIMGS = htmlTaskImgsSlider.querySelectorAll(
    ".outgoing-wrapper__file-img"
  );

  let imgLinksArrow = [];

  fileIMGS.forEach((fileImgElem) => {
    imgLinksArrow.push(fileImgElem.src);
  });

  return imgLinksArrow;
}

export function parseArrowTask_to_taskRightInnerHTML(arrowTask) {
  let taskRightInnerHtml = "";

  if (arrowTask.title) {
    taskRightInnerHtml += title(arrowTask.title);
  }
  if (arrowTask.note) {
    taskRightInnerHtml += note(arrowTask.note);
  }
  if (arrowTask.date) {
    taskRightInnerHtml += date(arrowTask.date);
  }
  if (arrowTask.imgs.length > 0) {
    taskRightInnerHtml += imgsSlider(arrowTask.imgs);
  }

  return taskRightInnerHtml;
}
