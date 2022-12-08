const outgoingWrapper__filesContainer = document.querySelector(
  ".outgoing-wrapper__files-container"
);

let filesContainer = [];

export function pushToContainer(input) {
  let file = input.files[0];

  filesContainer.push(window.URL.createObjectURL(file));

  outgoingWrapper__filesContainer.insertAdjacentHTML("beforeend", `
    <div class="outgoing-wrapper__file-item">
      <img class="outgoing-wrapper__file-delete-btn" src="./img/mini-icons/delete-btn.svg" alt="delete btn">
      <div class="outgoing-wrapper__file-img-container">
        <img class="outgoing-wrapper__file-background" src="./img/mini-icons/img-icon.svg" alt="image icon">
        <img src="${window.URL.createObjectURL(file)}" alt="" class="outgoing-wrapper__file-img">
      </div>
      <div class="outgoing-wrapper__file-item-right">
        <span class="outgoing-wrapper__file-name">Изображение</span>
        <i class="outgoing-wrapper__drag-and-drop-btn"></i>
      </div>
    </div>
  `)
}
