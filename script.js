'use strict';


let data;
const btn_next = document.querySelector('.next')
const btn_back = document.querySelector('.back')
const div_cards = document.querySelector('.cards')
const div_buttons = document.querySelector('.buttons')
const select = document.getElementById('worlds')

async function prepare() {
    let response = await fetch('https://rickandmortyapi.com/api/character');
    if (response.ok) {
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
    } else {alert(`failure to fetch data from https://rickandmortyapi.com/api/character`)}
}
prepare()  

// function create_options() {
//     for (let y = 1; y < 127 ; y++) {
//     let x = `https://rickandmortyapi.com/api/location/${y}`
//         let option = document.createElement('option')
//         async function get_data() {
//             let response = await fetch(x);
//             if (response.ok) {
//                 data = await response.json();
//                 option.value = data.name;
//                 option.innerText = data.name;
//                 select.append(option)
//             } else {alert(`failure to fetch data from https://rickandmortyapi.com/api/location/$`)}
//         }
//         get_data() 
//     }
// }
// create_options()

const search_input = document.createElement('input')
const _input = document.createElement('input')

div_buttons.append(search_input)
search_input.style.width = '300px'
search_input.style.height = '40px'
search_input.placeholder = 'find character'


search_input.addEventListener('input', sort_cards)
function sort_cards(event) {
    let array = data.results.filter(elem => elem.name.toLowerCase().includes(event.target.value.trim()))
    div_cards.innerHTML = "";
    array.forEach(elem => div_cards.append(create_card(elem)))
    return div_cards
}


function create_card(object) {
const div_card = document.createElement('div')
const cardImage = document.createElement('img')
const name1 = document.createElement('h2')
const species = document.createElement('span')
    cardImage.src = object.image
    name1.textContent = object.name
    species.textContent = object.species

    div_card.append(cardImage)
    div_card.append(name1)
    div_card.append(species)
    
return div_card
}


btn_next.addEventListener('click', moveOn)
function moveOn() {
div_cards.innerHTML = "";
if (data.info.next != null) {
async function prepare() {
    let response = await fetch(data.info.next);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
        
}
prepare() 
sort_cards()
} else {
    prepare()
}
}


btn_back.addEventListener('click', moveBack)
function moveBack() {
div_cards.innerHTML = "";
if (data.info.prev != null) {
async function prepare() {
    let response = await fetch(data.info.prev);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}
prepare() 
sort_cards()
} else {
     prepare()
}
}










