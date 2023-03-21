'use strict';

let data;
const btn_next = document.querySelector('.next')
const btn_back = document.querySelector('.back')
const div_cards = document.querySelector('.cards')
const div_buttons = document.querySelector('.buttons')

async function prepare() {
    let response = await fetch('https://rickandmortyapi.com/api/character');
    if (response.ok) {
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
    } else {alert(`error`)}
}
prepare()

const search_input = document.createElement('input')
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
div_cards.innerHTML = ""

}









