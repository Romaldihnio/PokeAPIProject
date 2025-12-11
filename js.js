let info = ""
const button = document.querySelector(".search__button")
const textInput = document.querySelector(".search__input")

button.addEventListener("click", function(e){
    e.preventDefault()
    const name = textInput.value
    getPokemon(name)
})


async function getPokemon(name){
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name) 
    .then ((response) => {
        if(!response.status.ok){
            if(response.status == 404){ 
                alert("Покемон не найден")
                 console.error("Error: " + response.status)
            }

            if(response.status === 500){ 
                alert("Покемоны не доступны")
                 console.error("Error: " + response.status)}
           
        }
        return response
    })
    .then(Response => Response.json())
    .then(data => {
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
        
    })
}







