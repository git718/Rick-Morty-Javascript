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
select.style.width = '260px';
const page = document.querySelector(".page")
const page_hidden = document.querySelector(".page_hidden")
page_hidden.style.cursor = 'pointer'
const direction_buttons = document.querySelector(".direction_buttons")



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
    select.innerHTML = ""
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
        if (x.selected == true) {
            div_cards.innerHTML = '';
            for (let y of data.results) {  
                if (y.location.name === x.value) {
                div_cards.append(create_card(y))
            } 
            }
        } 
    } 
} 



select.addEventListener('focusout', defaultSelect)
function defaultSelect() {
      create_options() 
      div_cards.innerHTML = '';
      data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}


const search_input = document.createElement('input')

inputButton.append(search_input)
search_input.style.width = '260px'
search_input.style.height = '30px'
search_input.placeholder = 'Filter by Name, Species, & Planet'



search_input.addEventListener('input', sort_cards)
function sort_cards() {
    let array = data.results.filter(elem => elem.name.toLowerCase().includes(search_input.value.trim()))
    div_cards.innerHTML = "";
    array.forEach(elem => div_cards.append(create_card(elem)))

    return div_cards
}


function clearValue() {
    search_input.value = '';
    sort_cards()
    
}



refresh.addEventListener('click', refreshPage)
function refreshPage() {
    direction_buttons.style.display = 'none'
    page_hidden.style.display =  "inline";
    basket_btn.removeEventListener('click', showBasket) 
search_input.placeholder = 'Filter by Name, Species, & Planet'
 select.style.display = "none"
   div_cards.innerHTML = "";
    for (let i = 1; i <= 42; i++) {
    async function prepare() {
        let response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
        if (response.ok) {
            data = await response.json();
            data.results.forEach(elem => { div_cards.append(create_card(elem)) })
        
        } else {alert(`failure to fetch data from https://rickandmortyapi.com/api/character`)}
    }
    prepare()
}



search_input.removeEventListener('input', sort_cards)
search_input.removeEventListener("focusout", clearValue)
search_input.addEventListener("input", sorthThemAll)
function sorthThemAll() {
for (let div of div_cards.children) {
    if (div.innerText.toLowerCase().includes(search_input.value)) {
        div.style.display = "block";
    }  else if (!div.innerText.toLowerCase().includes(search_input.value))
    {div.style.display = "none";}
}
}
}

page_hidden.addEventListener('click', return_pages)
function return_pages() {
    count_n = 0;
    page.innerText = 0;
    select.style.display = "inline"
    search_input.value = "";
    basket_btn.addEventListener('click', showBasket) 
    direction_buttons.style.display = "grid";
    basket.style.display = "flex";
    page_hidden.style.display =  "none";
    prepare();
    
 
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
const world = document.createElement('span');
world.style.display = "block"
world.setAttribute('id', 'world');


    cardImage.src = object.image;
    name1.textContent = object.name;
    species.textContent = object.species;
    world.textContent = object.location.name;
    div_card.append(cardImage);
    div_card.append(name1);
    div_card.append(species);
    div_card.append(world);
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

 select.style.display = "inline"
div_cards.innerHTML = "";
if (data.info.next !== null) {
async function prepare() {
    let response = await fetch(data.info.next);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
   
    create_options(data)
    clearValue()
    sort_cards()
   

}
prepare() 
} else {
data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}
}

let count_n = 0;
page.textContent = count_n;
btn_next.addEventListener('click', count_next)
btn_back.addEventListener('click', count_back)
function count_next() {
    if (count_n < 41) {
 count_n++;
 page.textContent = count_n;
    } else {page.textContent = ".."}
 }
function count_back() { 
    if (count_n > 0) {
count_n--;
page.textContent = count_n;
    } else {page.textContent = ".."}
}



btn_back.addEventListener('click', moveBack)
function moveBack() {
 select.style.display = "inline"
div_cards.innerHTML = "";
if (data.info.prev !== null) {
async function prepare() {
    let response = await fetch(data.info.prev);
        data = await response.json();
        data.results.forEach(elem => { div_cards.append(create_card(elem)) })
   
    create_options(data)
    clearValue()
    sort_cards()
 
}
prepare() 
} else {
 data.results.forEach(elem => { div_cards.append(create_card(elem)) })
}
}










