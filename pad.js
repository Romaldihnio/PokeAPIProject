const container = document.querySelector(".container")
const title = document.querySelector(".container_title")
const main =   document.querySelector(".main")
let pageNumber = 1
document.querySelector(".nav__button-prev").addEventListener("click", function(){
    pageNumber -= 1
    renderList(20,pageNumber)
})
document.querySelector(".nav__button-next").addEventListener("click", function(){
    pageNumber += 1
    renderList(20,pageNumber)
})





async function renderList(count, numberList) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${count*numberList-1}`)
    .then(response => response.json())
    console.log(response)
    container.innerHTML = ""
    response.results.forEach(pokemon => {
       let newTitle = title.cloneNode(true)
       newTitle.querySelector(".title_text").textContent = pokemon.name
       newTitle.addEventListener("click", async function(){
          const res = await fetch(pokemon.url)
          .then(response => response.json())
          renderPokemon(res)
       })
       newTitle.classList.remove("hidden")
       container.appendChild(newTitle)
    });
}

renderList(20,1)

async function renderPokemon(data){
        main.classList.add("hidden")
        console.log(data)
        const card = document.querySelector(".card")
        const image = document.querySelector(".card__image")
        const card_name = document.querySelector(".card__name")
        const id = document.querySelector(".card__id")
        const type = document.querySelector(".card__ability")
        card.classList.remove("hidden")
        image.setAttribute("src", data.sprites.front_default)
        card_name.textContent = data.name
        id.textContent = "Id: " + data.id
        type.textContent = "Type: " + data.types[0].type.name

        card.querySelector(".backButton").addEventListener("click", function(){
            main.classList.remove("hidden")
            card.classList.add("hidden")
        })
        
}














