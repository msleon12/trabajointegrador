// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

//Géneros desplegables

let submenu = document.querySelector(".submenu")
let genres = document.querySelector(".genres")
let urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es-ES`

fetch(urlGeneros)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    let generos = data.genres

    for(let i=0; i<generos.length; i++){
    submenu.innerHTML += `<li><a href="./detallegenero.html">${generos[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})

//Géneros (películas)
fetch(urlGeneros)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    let generos = data.genres

    for(let i=0; i<generos.length; i++){
    genres.innerHTML += `<li><a href="./detallegenero.html">${generos[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})

//Géneros (series)
let urlGenerosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=es-ES`
let genresSeries = document.querySelector(".tv")
fetch(urlGenerosSeries)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    let generosTV = data.genres

    for(let i=0; i<generosTV.length; i++){
    genresSeries.innerHTML += `<li><a href="./detallegenero.html">${generosTV[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})