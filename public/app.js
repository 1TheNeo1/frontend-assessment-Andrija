const radioButtonsContainer = document.getElementById('radio-buttons')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebarChevIcon = document.querySelector('.radio-buttons__chevron')
const loader = document.getElementById('loader')

const animationStates = {
  show: true,
  hide: false
}

const animationState = (animation, state) => {
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
  const radios = document.querySelectorAll('.radio-buttons__button')
  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      fetchData(parseInt(radio.value))
    })
  })
}

sidebarWrapper.addEventListener('click', (e) => {
  if (e.target !== radioButtonsContainer && !radioButtonsContainer.contains(e.target)) {
    sidebarWrapper.classList.toggle('hide-radio-btns')
    sidebarChevIcon.classList.toggle('chevron-orange')
  }
})

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target !== sidebarWrapper && !sidebarWrapper.contains(e.target)) {
    sidebarWrapper.classList.add('hide-radio-btns')
    sidebarChevIcon.classList.remove('chevron-orange')
  }
})

const importData = (data) => {
  const image = document.getElementById('image')
  const title = document.getElementById('title')
  const description = document.getElementById('text')
  const radioButtonsTitle = document.querySelector('.radio-buttons__title p')

  image.src = './images/' + data.coverImage
  title.innerText = data.title
  description.innerText = data.description

  radioButtonsTitle.innerText = data.title
}

const fetchData = (itemID) => {
  animationState(loader, animationStates.hide)
  fetch('http://localhost:3000/api/data.json').then((response) => response.json()).then((data) => {
    data.map((item, i) => {
      return (itemID === item.id) ? importData(item) : ''
    }).join('')
    animationState(loader, animationStates.show)
  })
}

fetch('http://localhost:3000/api/data.json').then((response) => response.json()).then((data) => {
  radioButtonsContainer.innerHTML = data.sort((a, b) => a.order - b.order).map((item, index) => {
    if (index === 0) {
      importData(item)
    }
    return `<div class="radio-buttons__button-content"> <input id="option-${index}" class="radio-buttons__button" type="radio" name="radio-button" value="${item.id}" ${index === 0 ? 'checked' : ''} /> <label for="option-${index}" class="radio-button-label">${item.shortTitle}</label></div>`
  }).join('')
  radiosEventListener()
  animationState(loader, animationStates.hide)
})
