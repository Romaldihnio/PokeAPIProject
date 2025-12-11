const api = "https://pokeapi.co/api/v2/pokemon"
const limit = 100
let pokemons = []
let detailsArray = []
let currentView = []
const container = document.getElementById("container")
async function getPokemonsList(limit){
    const data = await fetch(api + `?limit=${limit}&offset=0`)
    .then((response) => saveJson(response))
    return data.results
}
async function getPokemonDetails(pokemon) {
    const details = await fetch(pokemon.url)
    .then((response) => saveJson(response))
    return details
}
async function saveJson(response){
     if(!response.ok){
        const text = await response.text().catch(() => '')
        throw new Error(response.status + " " + response.statusText + " " + text)
     }
     return response.json()
}
function displayPokemons(view){
    container.innerHTML = ""
    const fragment = document.createDocumentFragment()
    view.forEach(element => {
        const wrapper = document.createElement("div")
        wrapper.innerHTML = renderPokemon(element).trim()
        fragment.appendChild(wrapper.firstElementChild)
    });
    container.appendChild(fragment)
}
function renderPokemon(pokemonDetails){
     const sprite = pokemonDetails.sprites?.front_default
     const types = pokemonDetails.types?.map(t =>t.type.name).join(", ") || "unknown"
     const hp = pokemonDetails.stats.find(s => s.stat.name === "hp")?.base_stat
     const def = pokemonDetails.stats.find(s => s.stat.name === "defense")?.base_stat
     const attack = pokemonDetails.stats.find(s => s.stat.name === "attack")?.base_stat
     return`
     <div class="card">
      <img src="${sprite}"
           alt="${pokemonDetails.name}" class="card__image">
      <h2 class="card__name">${pokemonDetails.name}</h2>
      <p class="card__id">#${pokemonDetails.id}</p>
      <div class="params">
          <div class="param param-hp">
            <img src="icons8-сердце-48.png" alt="">
            <p>${hp}</p>
          </div>
          <div class="param param-attack">
            <img src="icons8-борьба-на-палках-50.png" alt="">
            <p>${attack}</p>
          </div>
          <div class="param param-def">
            <img src="icons8-щит-48.png" alt="">
            <p>${def}</p>
          </div>
      </div>
      <p class="card__ability">Тип: ${types}</p>
    </div>`
}
function applyfilters(){
    const name_value = document.getElementById("filter_name").value.trim().toLowerCase()   
    const filter_value = document.getElementById("filter_type").value.trim().toLowerCase()
    const select_value = document.getElementById("sort_select").value.trim().toLowerCase()

    let filtered = detailsArray.filter(p => p.name.toLowerCase().includes(name_value))

    if(filter_value){
      filtered = filtered.filter(p => p.types.some(t => t.type.name.toLowerCase() === filter_value))
    }

    switch(select_value){
      case "id-asc":
        filtered.sort((a,b) => a.id - b.id);break;
        case "id-desc":
        filtered.sort((a,b) => b.id - a.id);break;
        case "name-asc":
        filtered.sort((a,b) => a.name.localeCompare(b.name));break;
        case "name-desc":
        filtered.sort((a,b) => b.name.localeCompare(a.name));break;
        
    }
    console.log(filtered)
        currentView = filtered
        displayPokemons(currentView)
}
function bindControls(){
    const name_input = document.getElementById("filter_name")   
    const filter_input = document.getElementById("filter_type")
    const select_input = document.getElementById("sort_select")

    name_input.addEventListener("input", applyfilters)
    filter_input.addEventListener("change", applyfilters)
    select_input.addEventListener("change", applyfilters)
}
(async () =>{
    pokemons =  await getPokemonsList(limit)
    detailsArray = await Promise.all(pokemons.map(pokemon => getPokemonDetails(pokemon)))
    currentView = [...detailsArray].sort((a,b) => a.id - b.id)
    displayPokemons(currentView)
    bindControls()
})()

