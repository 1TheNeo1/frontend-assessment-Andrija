const radioButtonsContainer = document.getElementById('radio-buttons')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebarChevIcon = document.querySelector('.sidebar-wrapper__chevron')
let collectedData

const showLoader = (state) => {
  const animation = document.getElementById('loader')
  if (state === true) {
    animation.classList.remove('hide-animation')
    animation.classList.add('show-animation')
    animation.querySelector('lottie-player').play()
  } else if (state === false) {
    setTimeout(() => {
      animation.classList.remove('show-animation')
      animation.classList.add('hide-animation')
      animation.querySelector('lottie-player').pause()
    }, 1000)
  }
}

const radiosEventListener = () => {
  const radios = document.querySelectorAll('.radio-buttons-content__button')
  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      setActiveItem(parseInt(radio.value), collectedData)
    })
  })
}

const setActiveItem = (dataID, collectedData) => {
  const data = collectedData.find(data => data.id === dataID) // Find the data based on the id of the objecet

  document.getElementById('image').src = './images/' + data.coverImage
  document.getElementById('title').innerText = data.title
  document.getElementById('text').innerText = data.description
  document.querySelector('.sidebar-wrapper__title p').innerText = data.title
}
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/api/data.json').then((response) => response.json()).then((data) => {
    collectedData = data.sort((a, b) => a.order - b.order)
    radioButtonsContainer.innerHTML = collectedData.map((item, index) => {
      return `
     <div class="radio-buttons-content">
      <input id="option-${index}" class="radio-buttons-content__button" type="radio" name="radio-button" value="${item.id}" ${index === 0 ? 'checked' : ''} />
      <label for="option-${index}" class="radio-buttons-content__label">${item.shortTitle}</label>
     </div>`
    }).join('')
    setActiveItem(collectedData[0].id, collectedData)
    radiosEventListener()
    showLoader(false)
  })
  sidebarWrapper.addEventListener('click', (e) => {
    if (e.target !== radioButtonsContainer && !radioButtonsContainer.contains(e.target)) {
      sidebarWrapper.classList.toggle('hide-radio-btns')
      sidebarChevIcon.classList.toggle('chevron-orange')
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target !== sidebarWrapper && !sidebarWrapper.contains(e.target)) {
      sidebarWrapper.classList.add('hide-radio-btns')
      sidebarChevIcon.classList.remove('chevron-orange')
    }
  })
})

module.exports = { setActiveItem, radiosEventListener }
