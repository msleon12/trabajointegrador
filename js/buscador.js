$(window).load(function() {
  // Desaparecer loader
  $(".load").fadeOut(1000);
})

//obtengo el query string
let queryString = window.location.search

//paso de ese texto a un objeto
let objetoQuery = new URLSearchParams(queryString);

//ahora si obtengo el resultado de la busqueda
let resultado = objetoQuery.get('titulo');
let media = objetoQuery.get('media')
let filtro = objetoQuery.get('filtro')

const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/${filtro}?api_key=${api_key}&language=es-ES` 
const image_url = "https://image.tmdb.org/t/p/w500" 

//construyo una URL dinámica, que permita que aparezca cualquier valor que busco
const newUrl = urlBuscador + '&query=' + resultado

if(filtro == "movie"){
  fetch(newUrl)
  .then(function(response){
      return response.json()
  })
  .then(function(data){
    console.log(data)
    let contenedor = document.querySelector("#contenedor")
    let movies = data.results 

    // for(let i=0; i<movies.length; i++){  Lo que escribi abajo es igual a esto 

    for (const movie of movies) {

      contenedor.innerHTML+= `<article class="art-peli">
                                <a class="peli" href=detallepeli.html?id=${movie.id}&media=movie>
                                  <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                  <h3>${movie.title}</h3>
                                </a>
                              </article>`
    }
})
  .catch(function(error){
    console.log('El error fue: ', error)
  })
} //IF
else if(filtro == "tv"){
  fetch(newUrl)
  .then(function(response){
      return response.json()
  })
  .then(function(data){
    console.log(data)
    let contenedor = document.querySelector("#contenedor")
    let movies = data.results 
    for (const movie of movies) {
      contenedor.innerHTML+=`<article class="art-peli">
                                            <a class="peli" href=detallepeli.html?id=${movie.id}&media=tv><img
                                            src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                            <h3>${movie.name}</h3></a>
                              </article>`
    }
  }) //THEN  
  .catch(function(error){
    console.log('El error fue: ', error)
  })
} //Else if
else if(filtro == "person"){
  fetch(newUrl)
  .then(function(response){
      return response.json()
  })
  .then(function(data){
    console.log(data)
    let contenedor = document.querySelector("#contenedor")
    let movies = data.results 
    for (const movie of movies){
      contenedor.innerHTML+= `<article class="art-peli">
                                          <a class="peli" href=detallepeli.html?id=${movie.id}&media=person>
                                          <img src=${image_url + movie.profile_path} data-movie-id=${movie.id}/>
                                          <h3>${movie.name}</h3></a>
                                        </article>`
    }
  })
}
else{
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=es-ES&query=${resultado}`)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
    let contenedor = document.querySelector("#contenedor")
    let movies = data.results 
    for (const movie of movies){
      if(movie.media_type == "movie" && movie.poster_path){
        contenedor.innerHTML+=`<article class="art-peli">
                                <a class="peli" href=detallepeli.html?id=${movie.id}&media=movie>
                                  <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                  <h3>${movie.title}</h3>
                                </a>
                              </article>`
      }
      else if(movie.media_type == "tv" && movie.poster_path){
        contenedor.innerHTML+=`<article class="art-peli">
                                          <a class="peli" href=detallepeli.html?id=${movie.id}&media=tv><img
                                          src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                          <h3>${movie.name}</h3></a>
                                      </article>`
      }
      else if (movie.media_type == "person" && movie.profile_path){ //Para personas
              contenedor.innerHTML+= `<article class="art-peli">
                                          <a class="peli" href=detallepeli.html?id=${movie.id}&media=person>
                                          <img src=${image_url + movie.profile_path} data-movie-id=${movie.id}/>
                                          <h3>${movie.name}</h3></a>
                                        </article>`
      } 

    } // FOR
  }) //THEN

} //ELSE


// Flechas de scroll
let flechaIzquierda = document.querySelector(".flecha-izquierda")
let flechaDerecha = document.querySelector(".flecha-derecha")
let principal = document.querySelector(".peliculas")

flechaDerecha.addEventListener('click',function(){
    principal.scrollLeft += (principal.offsetWidth -300)
})

flechaIzquierda.addEventListener('click',function(){
    principal.scrollLeft -= (principal.offsetWidth -300)
})