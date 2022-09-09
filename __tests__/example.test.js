// describe('Example', () => {
//   test('2 + 2 is equal to 4', () => {
//     expect(2 + 2).toBe(4);
//   });
// });
// import { setActiveItem } from '../public/app'
const testiranje = require('../public/app')
const collectedData = [
  {
    id: 129383,
    title: 'All Photos',
    shortTitle: 'All',
    coverImage: 'all-photos.jpg',
    order: 10,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam. Pellentesque sit amet porttitor eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.'
  },
  {
    id: 378858,
    title: 'Free Photos',
    shortTitle: 'Free',
    coverImage: 'free-photos.jpg',
    order: 20,
    description: 'Ultrices sagittis orci a scelerisque purus semper eget duis. Ante in nibh mauris cursus. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus.'
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
describe('test', () => {
  test('Sidebar title change', () => {
    document.body.innerHTML = `
      <div class="radio-buttons__title"><p></p></div>
    <div class="radio-buttons-content">
    <input id="option-0" class="radio-buttons__button" type="radio" name="radio-button" value="129383">
    <label for="option-0" class="radio-button-label">All</label>
   </div>
   <div class="item-box">
      <img id="image" src="" class="item-box__image" alt="natue image" />
      <div class="item-box__text-content">
        <h2 id="title" class="item-box__title"></h2>
        <p id="text" class="item-box__text"></p>
      </div>
    </div>`

    // const importData = (dataID) => {
    //   const data = collectedData.find(data => data.id === dataID) // Find the data based on the id of the objecet
    //   document.getElementById('image').src = './images/' + data.coverImage
    //   document.getElementById('title').innerText = data.title
    //   document.getElementById('text').innerText = data.description
    //   document.querySelector('.radio-buttons__title p').innerText = data.title
    // }

    const radios = document.querySelectorAll('.radio-buttons__button')
    radios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        testiranje.setActiveItem(parseInt(radio.value))
      })
    })
    document.querySelector('.radio-button-label').click()
    expect(document.querySelector('.radio-buttons__title p').innerText).toEqual('All Photos')
    expect(document.getElementById('image').src).toEqual('http://localhost/images/all-photos.jpg')
    expect(document.getElementById('title').innerText).toEqual('All Photos')
    expect(document.getElementById('text').innerText).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam. Pellentesque sit amet porttitor eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.') 
  })
})
