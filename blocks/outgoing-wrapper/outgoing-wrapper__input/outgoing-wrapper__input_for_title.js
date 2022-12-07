const outgoingWrapper__input_for_title = document.querySelector(
  ".outgoing-wrapper__input_for_title"
);
const outgoingWrapper__doneBtn = document.querySelector(
  ".outgoing-wrapper__done-btn"
);
const outgoingWrapper__addBtn = document.querySelector(
  ".outgoing-wrapper__add-btn"
);

export function onChange() {
  if (outgoingWrapper__input_for_title.innerText.trim() !== "") {
    outgoingWrapper__doneBtn.classList.add(
      "outgoing-wrapper__done-btn_clickable"
    );
    outgoingWrapper__addBtn.classList.add(
      "outgoing-wrapper__add-btn_clickable"
    );
  } else {
    outgoingWrapper__doneBtn.classList.remove(
      "outgoing-wrapper__done-btn_clickable"
    );
    outgoingWrapper__addBtn.classList.remove(
      "outgoing-wrapper__add-btn_clickable"
    );
  }
}
