
import { buscarPokemon } from "./utils/buscador";
import { pedirPokemons, pedirMasInfoDelPokemon } from "./utils/api";
import { crearPokemonInfoCars } from "./components/Card";

const pokemonContainer = document.getElementById("pokemon-container")


async function cargarPokemons() {

const pokemons= await pedirPokemons()



const pokemosConMasInfo= await Promise.all (pokemons.map(pokemon=> {
       return pedirMasInfoDelPokemon(pokemon.url)

  })
);
console.log("🚀 ~ pokemosConMasInfo ~ pokemosConMasInfo:", pokemosConMasInfo)



    
  pokemosConMasInfo.forEach((pokemon)=>{

    const card = crearPokemonInfoCars(pokemon)
    console.log("🚀 ~ pokemosConMasInfo.forEach ~ card:", card)
    
    pokemonContainer.appendChild(card)
})

}

export function renderLogin() {
  const isLogin= localStorage.getItem("loggedin");
  if (isLogin !== "true"){
    window.location.href="./components/login/login.html";
  }
  
}



renderLogin()

cargarPokemons()

//funcion para el buscador
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#search'); // Asegúrate de tener un input con id="buscador"
  let resultadoDiv = document.querySelector('#resultado'); // Intentamos encontrar el div con id="resultado"

  // creamos el div contenedor
  if (!resultadoDiv) {
      resultadoDiv = document.createElement('div');
      resultadoDiv.id = 'resultado';  // Le asignamos un id
      document.body.appendChild(resultadoDiv);  // Lo agregamos al body o al contenedor que prefieras
  }
console.log(resultadoDiv )
  // Evento onChange para el input, segun vamos escribiendo la palabra autocompleta
  input.addEventListener('input', async (event) => {
      const query = event.target.value;

      if (query.trim() === '') {
          resultadoDiv.innerHTML = ''; // Si el input está vacío, borrar los resultados
          return;
      }

      // Llamada a la función de búsqueda
      const pokemon = await buscarPokemon(query);

      if (pokemon) {
          // Mostrar el resultado en el HTML
          resultadoDiv.innerHTML = `
              <h3>${pokemon.name.toUpperCase()}</h3>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
          `;
      } else {
          // Mostrar mensaje de error si no se encuentra el Pokémon
          resultadoDiv.innerHTML = '<p>No se encontró ese Pokémon.</p>';
      }
  });
});







