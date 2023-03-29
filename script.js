'use strict';

let data = {};
let count = 1;
const counter = document.getElementById('result')
const btn_next = document.querySelector('.next')
const btn_back = document.querySelector('.back')
const div_cards = document.querySelector('.cards')
const div_buttons = document.querySelector('.buttons')
const select = document.getElementById('worlds')
const clear = document.querySelector('.clear')
const inputButton = document.querySelector('.input_button')
const basket = document.createElement('div')
basket.className = 'div_basket'
const basket_btn = document.querySelector('.basket')
const empty = document.querySelector('.empty')
const refresh = document.querySelector('.refresh')



async function prepare() {
    let response = await fetch('https://rickandmortyapi.com/api/character');
    if (response.ok) {
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
        create_options(data)
        sort_cards()
       
    } else {alert(`failure to fetch data from https://rickandmortyapi.com/api/character`)}
   
}
prepare()  




function create_options() {
    select.innerHTML = ''
    const optionSelected = document.createElement('option');
    optionSelected.value = 'Pick a planet';
    optionSelected.innerText = 'Sort by planet';
    optionSelected.selected = true;
    optionSelected.hidden = true;
    select.append(optionSelected);
        let arr = data.results.map((elem) => elem.location.name)
        let uniquePlanets = [...new Set(arr)];
        for (let planet of uniquePlanets) {
            const option = document.createElement('option');
            option.innerText = planet;
            option.value = planet;
            select.append(option);      
        }
    }
    
select.addEventListener('change', filterData) 
function filterData() {
    for (let x of select) {
        if (x.selected === true) {
            div_cards.innerHTML = '';
            for (let y of data.results) {  
                if (y.location.name === x.value) {
                div_cards.append(create_card(y))
            } 
        }
    } 
} 
}





const search_input = document.createElement('input')

inputButton.append(search_input)
search_input.style.width = '260px'
search_input.style.height = '30px'
search_input.placeholder = 'filter by name'


search_input.addEventListener('input', sort_cards)
function sort_cards() {
    let array = data.results.filter(elem => elem.name.toLowerCase().includes(search_input.value.trim()))
    div_cards.innerHTML = "";
    array.forEach(elem => div_cards.append(create_card(elem)))

    search_input.addEventListener('focusout', clearValue)
function clearValue() {
        search_input.value = '';
        sort_cards()
    
}
        
    

    return div_cards
}





refresh.addEventListener('click', refreshPage)
function refreshPage() {
    prepare()
}

basket_btn.addEventListener('click', showBasket)
function showBasket() {
if (basket.innerHTML === '') {
alert('Basket is empty')
       } else {
div_cards.innerHTML = ''
div_cards.append(basket)
       }
}



function create_card(object) {
const div_card = document.createElement('div');
const div_card_hidden = document.createElement('div');
div_card_hidden.style.display = 'none';
div_card.className = 'div_one';
div_card_hidden.className = 'div_hidden';
const cardImage = document.createElement('img');
cardImage.style.width = '200px';
cardImage.style.height = '200px';
const name1 = document.createElement('h2');
name1.setAttribute('id', 'name1');
const species = document.createElement('span');
species.setAttribute('id', 'species');


    cardImage.src = object.image;
    name1.textContent = object.name;
    species.textContent = object.species;
    div_card.append(cardImage);
    div_card.append(name1);
    div_card.append(species);
    $(cardImage).mouseenter(function(){
        $(cardImage).animate({
            opacity: '50%',
    });
      });  
    $(cardImage).mouseleave(function(){
        $(cardImage).animate({
            opacity: '100%'
        });
      });  

      div_card.addEventListener('click', buy_character)
function buy_character()
 {
    div_card.removeEventListener('click', buy_character)
   basket.append(div_card)
  counter.innerText = count;
  count++

}


empty.addEventListener('click', emptyBasket)
function emptyBasket() {
    basket.innerHTML = '';
    count = 1;
    counter.innerText = '0';
}

return div_card
}


btn_next.addEventListener('click', moveOn)
function moveOn() {
div_cards.innerHTML = "";
if (data.info.next !== null) {
async function prepare() {
    let response = await fetch(data.info.next);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
    create_options(data)
    sort_cards()
    

}
prepare() 
} else {
data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}
}


btn_back.addEventListener('click', moveBack)
function moveBack() {
div_cards.innerHTML = "";
if (data.info.prev !== null) {
async function prepare() {
    let response = await fetch(data.info.prev);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
    create_options(data)
    sort_cards()
}
prepare() 
} else {
 data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}
}










