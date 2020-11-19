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
const urlGeneros = `https://api.themoviedb.org/3/genre/${id}?api_key=${api_key}&language=es-ES`
const image_url = "https://image.tmdb.org/t/p/w500"

// Para que aparezca el titulo
fetch(urlGeneros)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    let titulo = document.querySelector(".title")
        let caja = `<h1>${data.name}</h1>`
        titulo.innerHTML += caja
})

// Para que aparezcan las peliculas
fetch