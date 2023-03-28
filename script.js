'use strict';

let data = {};
const btn_next = document.querySelector('.next')
const btn_back = document.querySelector('.back')
const div_cards = document.querySelector('.cards')
const div_buttons = document.querySelector('.buttons')
const select = document.getElementById('worlds')
const clear = document.querySelector('.clear')
const inputButton = document.querySelector('.input_button')

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
    optionSelected.innerText = 'Pick a planet';
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

clear.addEventListener('click', function clearInput() {
search_input.value = '';
})



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

    return div_cards
}





function create_card(object) {
const div_card = document.createElement('div');
const div_card_hidden = document.createElement('div');
div_card_hidden.style.display = 'none';
div_card.className = 'div_one';
div_card_hidden.className = 'div_hidden';
const cardImage = document.createElement('img');
const name1 = document.createElement('h2');
const species = document.createElement('span');
const gender = document.createElement('p');
    gender.textContent = object.gender;
    cardImage.src = object.image;
    name1.textContent = object.name;
    species.textContent = object.species;
   div_card_hidden.append(gender);
    div_card.append(cardImage);
    div_card.append(name1);
    div_card.append(species);
    $(cardImage).mouseenter(function(){
        $(cardImage).animate({
            height: '330px',
            opacity: '50%',
    });
      });  
    $(cardImage).mouseleave(function(){
        $(cardImage).animate({
            height: '300px',
            opacity: '100%'
        });
      });  
    
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










