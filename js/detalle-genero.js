let container = document.querySelector('.tira')

// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
console.log(id);

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlGeneros2 = `https://api.themoviedb.org/3/genre/${id}?api_key=${api_key}&language=es-ES`
const image_url = "https://image.tmdb.org/t/p/w500"

// Para que aparezca el titulo
    fetch(urlGeneros2)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        let titulo = document.querySelector(".title")
        let caja = `<h1 class="genero">${data.name}</h1>`
        titulo.innerHTML += caja
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

// Para que aparezcan las peliculas
let peliculas = document.querySelector(".peliculas")
let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&region=AR`
let titGen = document.querySelector(".genero")

fetch(urlPeliculas)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        let results = data.results
        console.log(results)

        for(let i=0; i<10; i++){
            if (id = results[i].genre_ids[i]){
                let id_p = results[i].id
                let tira = `<article class="art-peli bus">
                                <a class="peli" href="detallepeli.html?id=${id_p}"><img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                <h3>${results[i].title}</h3>
                                </a>
                            </article>`;
                peliculas.innerHTML += tira;
            }
        }
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })