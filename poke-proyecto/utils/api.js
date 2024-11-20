const API_BASE= "https://pokeapi.co/api/v2"

export async function pedirPokemons() {
  

    const response= await fetch(`${API_BASE}/pokemon`);
    
    console.log("🚀 ~ pedirPokemons ~ response:", response)

    const data= await response.json();

    console.log("🚀 ~ pedirPokemons ~ data:", data)

    console.log("🚀 ~ pedirPokemons ~ data.results:", data.results)
     
     return data.results
}
    

export async function pedirMasInfoDelPokemon(url)  {
     
    const response= await fetch(url);
    const data = await response.json();
    console.log("🚀 ~ pedirMasInfoDelPokemon ~ data:", data)
    
    return data;
}