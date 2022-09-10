const puppeteer = require('puppeteer')
const { setActiveItem, radiosEventListener } = require('../public/app')
const mockCollectedData = [
  {
    id: 129383,
    title: 'All Photos',
    shortTitle: 'All',
    coverImage: 'all-photos.jpg',
    order: 10,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam. Pellentesque sit amet porttitor eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.'
  },
  {
    id: 542322,
    title: 'Pro Photos',
    shortTitle: 'Pro',
    coverImage: 'pro-photos.jpg',
    order: 30,
    description: 'Nunc scelerisque viverra mauris in aliquam sem. Leo vel orci porta non pulvinar neque laoreet. Odio pellentesque diam volutpat commodo sed egestas. Cum sociis natoque penatibus et magnis dis.'
  }
]
describe('testig functions from app.js', () => {
  document.body.innerHTML = `
  <div class="sidebar-wrapper hide-radio-btns">
    <div class="sidebar-wrapper__title">
      <p></p>
    </div>
    <div id="radio-buttons" class="radio-buttons">
    <div class="radio-buttons-content">
    <input id="option-0" class="radio-buttons-content__button" type="radio" name="radio-button" value="129383">
    <label for="option-0" class="radio-buttons-content__label">All</label>
   </div>
   <div class="radio-buttons-content">
    <input id="option-2" class="radio-buttons-content__button" type="radio" name="radio-button" value="542322">
    <label for="option-2" class="radio-buttons-content__label">Pro</label>
   </div></div>
  </div>
    <img id="image" src="" class="item-box__image" alt="natue image" />
    <div class="item-box__text-content">
      <h2 id="title" class="item-box__title"></h2>
      <p id="text" class="item-box__text"></p>
    </div>  
  `
  test('testing for data change on input click', () => {
    document.getElementById('option-0').addEventListener('change', (e) => {
      setActiveItem(parseInt(document.getElementById('option-0').value), mockCollectedData)
    })

    document.querySelector('.radio-buttons-content__label').click()
    expect(document.querySelector('.sidebar-wrapper__title p').innerText).toEqual('All Photos')
    expect(document.getElementById('image').src).toEqual('http://localhost/images/all-photos.jpg')
    expect(document.getElementById('title').innerText).toEqual('All Photos')
    expect(document.getElementById('text').innerText).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam. Pellentesque sit amet porttitor eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.')
  })
  test('adding event listener to input buttons', () => {
    radiosEventListener(mockCollectedData)
    document.querySelector('.radio-buttons-content__label').click()
    expect(document.querySelector('.sidebar-wrapper__title p').innerText).toEqual('All Photos')
    expect(document.getElementById('image').src).toEqual('http://localhost/images/all-photos.jpg')
    expect(document.getElementById('title').innerText).toEqual('All Photos')
    expect(document.getElementById('text').innerText).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam. Pellentesque sit amet porttitor eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.')
  })
})

test('should click around', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920,1080'],
    defaultViewport: {
      width: 400,
      height: 800
    }
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(1000) // wait for loading animation to complete
  await page.click('.sidebar-wrapper__title')
  await page.click('input#option-2')
  const titleText = await page.$eval('#title', el => el.textContent)
  expect(titleText).toEqual('Pro Photos')
  await page.click('input#option-0')
  const image = await page.$eval('#image', el => el.src)
  expect(image).toEqual('http://localhost:3000/images/all-photos.jpg')
  await page.click('input#option-1')
  const sidebarTitle = await page.$eval('.sidebar-wrapper__title p', el => el.textContent)
  expect(sidebarTitle).toEqual('Free Photos')
}, 10000)
