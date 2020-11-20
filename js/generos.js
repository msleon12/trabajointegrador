// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
let media = queryObject.get('media')
console.log(media)

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

let submenu = document.querySelector(".submenu")
let genres = document.querySelector(".genres")
let genresSeries = document.querySelector(".tv")
let urlGeneros = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${api_key}&language=es-ES`

//Géneros (películas)

if(media == "movie"){
    fetch(urlGeneros)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let generos = data.genres

        for(let i=0; i<generos.length; i++){
        genres.innerHTML += `<li><a href="./detallegenero.html?id=${generos[i].id}&media=${media}">${generos[i].name}</a></li>`;
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
} 
/* Géneros (series) */ else{
    fetch(urlGeneros)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        let generosTV = data.genres

        for(let i=0; i<generosTV.length; i++){
        genresSeries.innerHTML += `<li><a href="./detallegeneroserie.html?id=${generosTV[i].id}&media=${media}">${generosTV[i].name}</a></li>`;
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
}
