const outgoingWrapper__filesContainer = document.querySelector(
  ".outgoing-wrapper__files-container"
);

export function removeItem(deleteBtn) {
  const fileItem = deleteBtn.parentNode;
  const animationDuration = 300;
  
  fileItem.style.transition = `height ${animationDuration}ms, opacity ${animationDuration}ms`;
  fileItem.style.overflowY = 'hidden';
  fileItem.style.opacity = '0';
  fileItem.style.height = '0px';

  setTimeout(() => {
    fileItem.remove();
  }, animationDuration)
}

export function pushToContainer(input) {
  let file = input.files[0];

  outgoingWrapper__filesContainer.insertAdjacentHTML("beforeend", `
    <div class="outgoing-wrapper__file-item">
      <img class="outgoing-wrapper__file-delete-btn" onclick="outgoingWrapper__filesContainerJS.removeItem(this)" src="./img/mini-icons/delete-btn.svg" alt="delete btn">
      <div class="outgoing-wrapper__file-img-container">
        <img class="outgoing-wrapper__file-background" src="./img/mini-icons/img-icon.svg" alt="image icon">
        <img class="outgoing-wrapper__file-img" src="${window.URL.createObjectURL(file)}" alt="">
      </div>
      <div class="outgoing-wrapper__file-item-right">
        <span class="outgoing-wrapper__file-name">Изображение</span>
        <i class="outgoing-wrapper__drag-and-drop-btn"></i>
      </div>
    </div>
  `);
}
