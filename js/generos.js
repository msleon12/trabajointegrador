// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

let genres = document.querySelector(".mov")
let genresSeries = document.querySelector(".tv")
let urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es-ES`
let urlGenerosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=es-ES`

//Géneros (películas)

fetch(urlGeneros)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
    let generos = data.genres

    for(let i=0; i<generos.length; i++){
    genres.innerHTML += `<li class="genero-unico"><a href="./detallegenero.html?id=${generos[i].id}&media=movie">${generos[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})

//Géneros (series)

fetch(urlGenerosSeries)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
    let generosTV = data.genres

    for(let i=0; i<generosTV.length; i++){
    genresSeries.innerHTML += `<li class="genero-unico"><a href="./detallegenero.html?id=${generosTV[i].id}&media=tv">${generosTV[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})