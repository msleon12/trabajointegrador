//obtengo el query string
let queryString = window.location.search

//paso de ese texto a un objeto
let objetoQuery = new URLSearchParams(queryString);

//ahora si obtengo el resultado de la busqueda
let resultado = objetoQuery.get('titulo');
let media = objetoQuery.get('media')

const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500" 


const newUrl = urlBuscador + '&query=' + resultado //construyo una URL dinámica, que permita que aparezca cualquier valor que busco
fetch(newUrl)
.then(function(response){
    return response.json()
})
.then(function(data){
  console.log(data)
  let contenedor =document.querySelector("#contenedor")
  let movies= data.results 

  // for(let i=0; i<movies.length; i++){  Lo que escribi abajo es igual a esto 

  
  for (const movie of movies) {
    if(movie.media_type == "movie" && movie.poster_path){
      contenedor.innerHTML+=`<article class="art-peli detalle">
                              <a class="peli" href=detallepeli.html?id=${movie.id}&media=movie>
                                <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                <h3>${movie.title}</h3>
                              </a>
                            </article>`
    }
    else if(movie.media_type == "tv" && movie.poster_path){
      contenedor.innerHTML+=`<article class="art-peli detalle">
                                        <a class="peli" href=detallepeli.html?id=${movie.id}&media=tv><img
                                        src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
                                        <h3>${movie.name}</h3></a>
                                    </article>`
    }
    else if (movie.profile_path){ //Para personas
            contenedor.innerHTML+= `<article class="art-peli detalle">
                                        <a class="peli" href=detallepeli.html?id=${movie.id}&media=person>
                                        <img src=${image_url + movie.profile_path} data-movie-id=${movie.id}/>
                                        <h3>${movie.name}</h3></a>
                                      </article>`
            }
    }
});