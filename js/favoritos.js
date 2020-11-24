// Valores iniciales
let storage = localStorage.getItem('favoritos')
console.log(storage);
let storageJs = JSON.parse(storage); // Lo paso a JS. EL problema es que cuando lo vuelvo a pasar me lo pasa mal, no me devuelve un array de objetos
console.log(storageJs);

// localStorage.clear()
// Para favoritos
const contenedor1 = document.querySelector('.favoritos-tira-peli')
const contenedor2 = document.querySelector('.favoritos-tira-series')
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"

function removeFav(e){
    let elemento = this
    let storage = localStorage.getItem('favoritos') //Para saber cual es el estado del storage
    let storageJs = JSON.parse(storage); // Pasar de cadena de texto a javascript
    // e.target.parentElement.style.display = "none"
    console.log(e.target.parentElement)
    
    storageJs = storageJs.filter(function(movie){
        return elemento.id != movie.id 
    })
    localStorage.setItem('favoritos', JSON.stringify(storageJs)) //Lo guardo pero en formato string 

}
for (let i = 0; i<storageJs.length; i++){
    
    if(storageJs[i].tipo == "movie"){
        fetch(`https://api.themoviedb.org/3/movie/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            let movie = `<article class="favoritos">
                            <a href="detallepeli.html?id=${data.id}&media=movie">
                                <h2>${data.title}</h2>
                                <img src="${image_url + data.poster_path}" alt="${data.title}">
                            </a>
                            <button class="star" type="submit" id="${data.id}"><i class="fas fa-star "></i></button>
                        </article>`
            contenedor1.innerHTML += movie;

            let boton = document.querySelectorAll('.star')
                console.log(boton)
                for(let i = 0; i<boton.length; i++){
                    boton[i].style.backgroundColor = "blue"; 
                    boton[i].addEventListener('click',removeFav)
                }
            

        }) //then
        .catch(function(error){
            console.log('El error fue: ',);
        }) //CATCH

    } // if

} // For     







