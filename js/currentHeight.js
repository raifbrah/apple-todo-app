document.body.insertAdjacentHTML('afterbegin', `
  <style class="currentHeight">
    :root {
      --100vh: ${document.documentElement.clientHeight}px;
    }
  </style>
`)

const currentHeight = document.querySelector('.currentHeight')

window.addEventListener('resize', () => {
  currentHeight.innerHTML = `
    :root {
      --100vh: ${document.documentElement.clientHeight}px;
    }
  `
})