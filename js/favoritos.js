// Valores iniciales
let storage = localStorage.getItem('favoritos')
console.log(storage);
let storageJs = JSON.parse(storage); // Lo paso a JS
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
    e.currentTarget.parentElement.style.display = "none"
    console.log(e.currentTarget.parentElement)
    
    storageJs = storageJs.filter(function(movie){
        return elemento.id != movie.id && elemento.tipo != movie.tipo
    })
    
    localStorage.setItem('favoritos', JSON.stringify(storageJs)) //Lo guardo pero en formato string 
}

if(storageJs.length != 0){
    for (let i = 0; i<storageJs.length; i++){
        
        if(storageJs[i].tipo == "movie"){
            fetch(`https://api.themoviedb.org/3/movie/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                let movie = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${data.id}&media=movie">
                                    <img src="${image_url + data.poster_path}" alt="${data.title}">
                                    <h3>${data.title}</h3>
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
        else if (storageJs[i].tipo == "tv"){
            fetch(`https://api.themoviedb.org/3/tv/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                let movie = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${data.id}&media=tv">
                                    <img src="${image_url + data.poster_path}" alt="${data.name}">    
                                    <h3>${data.name}</h3>
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
                console.log('El error fue: ', error);
            }) //CATCH


        } //Else if
        else if(storageJs[i].tipo == "person"){
            fetch(`https://api.themoviedb.org/3/person/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                let movie = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${data.id}&media=person">
                                    <img src="${image_url + data.profile_path}" alt="${data.name}">
                                    <h3>${data.name}</h3>
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
            }) //Then
            .catch(function(error){
                console.log('El error fue: ', error);
            }) //CATCH
        } 
    } // For
} else {
    contenedor1.innerHTML += '<h2 class="sorry">No tenés ningún favorito guardado.</h2>'
}

// Flechas de scroll
let flechaIzquierda = document.querySelectorAll(".flecha-izquierda");
let flechaDerecha = document.querySelectorAll(".flecha-derecha")
let principal = document.querySelectorAll(".peliculas")

for(let i=0; i<flechaDerecha.length; i++){
    flechaDerecha[i].addEventListener('click', function(){
        principal[i].scrollLeft += (principal[i].offsetWidth -300)
    })
    flechaIzquierda[i].addEventListener('click', function(){
        principal[i].scrollLeft -= (principal[i].offsetWidth -300)
    })
}