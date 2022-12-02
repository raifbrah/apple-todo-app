const contextMenuBtn = document.querySelector('.context-menu-btn')
const contextMenuWindow = document.querySelector('.context-menu-window')
const shadowBg = document.querySelector('.shadow-bg')



export function open() {
  contextMenuBtn.classList.add('context-menu-btn_open')
  contextMenuWindow.classList.add('context-menu-window_open')

  shadowBg.style.visibility = 'visible'
  shadowBg.style.pointerEvents = 'auto'
  shadowBg.addEventListener('click', close)
}

function close() {
  contextMenuBtn.classList.remove('context-menu-btn_open')
  contextMenuWindow.classList.remove('context-menu-window_open')

  shadowBg.style.visibility = 'hidden'
  shadowBg.style.pointerEvents = 'none'

  shadowBg.removeEventListener('click', close)
}