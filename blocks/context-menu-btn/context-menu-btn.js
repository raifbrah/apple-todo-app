const contextMenuBtn = document.querySelector('.context-menu-btn')
const contextMenuWindow = document.querySelector('.context-menu-window')
const shadowBg = document.querySelector('.shadow-bg')



contextMenuBtn.onclick = () => {
  open()
  shadowBg.addEventListener('click', close)
}

function open() {
  contextMenuBtn.classList.add('context-menu-btn_open')
  contextMenuWindow.classList.add('context-menu-window_open')

  shadowBg.style.display = 'block'
  shadowBg.style.pointerEvents = 'auto'
}

function close() {
  contextMenuBtn.classList.remove('context-menu-btn_open')
  contextMenuWindow.classList.remove('context-menu-window_open')

  shadowBg.style.display = 'none'
  shadowBg.style.pointerEvents = 'none'

  shadowBg.removeEventListener('click', close)
}