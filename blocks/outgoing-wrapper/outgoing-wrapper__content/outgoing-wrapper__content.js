const outgoingWrapper__content = document.querySelector(
  ".outgoing-wrapper__content"
);
const outgoingWrapper__header = document.querySelector(
  ".outgoing-wrapper__header"
);

export function onScroll() {
  const scroll = outgoingWrapper__content.scrollTop;

  if (scroll > 0) {
    outgoingWrapper__header.classList.add("outgoing-wrapper__header_onsroll");
  } else {
    outgoingWrapper__header.classList.remove(
      "outgoing-wrapper__header_onsroll"
    );
  }
}