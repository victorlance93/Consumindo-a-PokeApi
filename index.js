// Criando o End Point da Api

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Crianção dos Get Elements

const searchInput = getElement('.search-input'),
    searchButton = getElement('.search-button'),
    container = getElement('.pokemon'),
    erroMessage = getElement('.error');

var pokeName, //Nome do Pokemon passado na Busca
    pokemon, // Guarda os dados da api
    card; // Recebimento do HTML 

function getElement(element) {
    return document.querySelector(element);
}

//Função para receber a requisição da Api
function requestPokeInfo(url, name) {
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
        })
        .catch(err => console.log(err));
}

//Criação do cartão que sera injetado no HTML
function createCard() {
    card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h3 class="name">${pokemon.name}</h3>
        <h4 class="number">Nº ${pokemon.id}</h4>
        <h5 class="type">Tipo: ${pokemon.types.map(item => item.type.name).toString()}</h5>
        <h5 class="weight">Peso: ${pokemon.weight / 10}kg</h5>
        <h5 class="height">Altura: ${pokemon.height / 10}m</h5>
    </div>`;
    return card;
}

//Função que inicia o app
function startApp(pokeName) {
    requestPokeInfo(baseUrl, pokeName);

    //Mensagem de erro caso o pokemon não exista
    setTimeout(function () {

        if (pokemon.detail) {
            erroMessage.style.display = 'block';
            container.style.display = 'none';
            
        } else {
            erroMessage.style.display = 'none';
            container.style.display = 'flex';
            container.innerHTML = createCard();
        }
    }, 2000);
}

searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startApp(pokeName);
    container.classList.add('fade');


    setTimeout(() => {
        container.classList.remove('fade');
    }, 3000);
});
