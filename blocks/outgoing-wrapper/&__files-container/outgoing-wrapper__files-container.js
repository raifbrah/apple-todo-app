const outgoingWrapper__filesContainer = document.querySelector(
  ".outgoing-wrapper__files-container"
);

export function removeItem(deleteBtn) {
  const outgoingWrapper__fileITEMS = document.querySelectorAll(
    ".outgoing-wrapper__file-item"
  );

  const fileItem = deleteBtn.parentNode;
  const animationDuration = 300;
  let itemDetected = false;

  fileItem.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms, background-color ${animationDuration}ms`;
  fileItem.style.transform = "translateX(-100%)";
  fileItem.style.backgroundColor = "var(--color_systemRed)";
  fileItem.style.opacity = 0;

  outgoingWrapper__fileITEMS.forEach((currentValue, index) => {
    if (fileItem === currentValue) {
      itemDetected = true;
    } else if (itemDetected === true) {
      currentValue.style.transition = `transform ${animationDuration}ms`;
      currentValue.style.transform = "translateY(-100%)";

      setTimeout(() => {
        currentValue.style.transition = "0ms";
        currentValue.style.transform = "translateY(0)";
      }, animationDuration);
    }
  });

  setTimeout(() => {
    fileItem.remove();
  }, animationDuration);
}

export function pushToContainer(input) {
  let file = input.files[0];

  outgoingWrapper__filesContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="outgoing-wrapper__file-item">
      <img class="outgoing-wrapper__file-delete-btn" onclick="outgoingWrapper__filesContainerJS.removeItem(this)" src="./img/mini-icons/delete-btn.svg" alt="delete btn">
      <div class="outgoing-wrapper__file-img-container">
        <img class="outgoing-wrapper__file-background" src="./img/mini-icons/img-icon.svg" alt="image icon">
        <img class="outgoing-wrapper__file-img" src="${window.URL.createObjectURL(
          file
        )}" alt="">
      </div>
      <div class="outgoing-wrapper__file-item-right">
        <span class="outgoing-wrapper__file-name">Изображение</span>
        <i class="outgoing-wrapper__drag-and-drop-btn"></i>
      </div>
    </div>
  `
  );
}

export function parseImgLinksArrow_to_html(imgLinksArrow) {
  let htmlImgFileItems = "";

  imgLinksArrow.forEach((imgLink) => {
    htmlImgFileItems += `
      <div class="outgoing-wrapper__file-item">
        <img class="outgoing-wrapper__file-delete-btn" onclick="outgoingWrapper__filesContainerJS.removeItem(this)" src="./img/mini-icons/delete-btn.svg" alt="delete btn">
        <div class="outgoing-wrapper__file-img-container">
          <img class="outgoing-wrapper__file-background" src="./img/mini-icons/img-icon.svg" alt="image icon">
          <img class="outgoing-wrapper__file-img" src="${imgLink}" alt="">
        </div>
        <div class="outgoing-wrapper__file-item-right">
          <span class="outgoing-wrapper__file-name">Изображение</span>
          <i class="outgoing-wrapper__drag-and-drop-btn"></i>
        </div>
      </div>
    `;
  });

  return htmlImgFileItems;
}
