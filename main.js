import * as sectionHeaderJS from "./blocks/section-header/section-header.js";
import * as outgoingWrapperJS from "./blocks/outgoing-wrapper/outgoing-wrapper.js";
import * as contextMenuBtnJS from "./blocks/context-menu-btn/context-menu-btn.js";
import * as taskJS from "./blocks/task/task.js";
import * as tasksWrapperJS from "./blocks/tasks-wrapper/tasks-wrapper.js";
import * as toggleSwitchJS from "./blocks/toggle-switch/toggle-switch.js";
import * as markJS from "./blocks/mark/mark.js";
import * as outgoingWrapper__filesContainerJS from "./blocks/outgoing-wrapper/&__files-container/outgoing-wrapper__files-container.js";
import * as imgViewerJS from "./blocks/img-viewer/img-viewer.js";

document.sectionHeaderJS = sectionHeaderJS;
document.outgoingWrapperJS = outgoingWrapperJS;
document.contextMenuBtnJS = contextMenuBtnJS;
document.taskJS = taskJS;
document.tasksWrapperJS = tasksWrapperJS;
document.toggleSwitchJS = toggleSwitchJS;
document.markJS = markJS;
document.outgoingWrapper__filesContainerJS = outgoingWrapper__filesContainerJS;
document.imgViewerJS = imgViewerJS;

// отключение zoom через скролл (в том числе трекападами в macOS)
document.addEventListener(
  "mousewheel",
  function (e) {
    if (!e.ctrlKey && !e.metaKey) return;

    e.preventDefault();
    e.stopImmediatePropagation();
  },
  { passive: false }
);

// отключение zoom прикосновениями (в том числе трекападами и т.п.) в Safari и iOS
document.addEventListener(
  "gesturestart",
  function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  },
  { passive: false }
);

// отключение zoom через клавиатуру (ctrl + "+", ctrl + "-")
// кнопки браузера для управления zoom отключены не будут
document.addEventListener(
  "keydown",
  function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    if (e.keyCode != 189 && e.keyCode != 187) return;

    e.preventDefault();
    e.stopImmediatePropagation();
  },
  { passive: false }
);
