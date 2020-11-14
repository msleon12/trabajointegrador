$(window).load(function() {
    // Desaparecer loader
    $(".load").fadeOut("slow");
})

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

//Géneros desplegables

let submenu = document.querySelector(".submenu")
let nombre = document.querySelector(".nombre")
let urlGeneros = "https://api.themoviedb.org/3/genre/movie/list?api_key=12058c71aa3652a9d53642bacf937088&language=es-ES"

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

//generos.html

fetch(urlGeneros)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    let generos = data.genres

    for(let i=0; i<generos.length; i++){
    nombre.innerText = generos[i].name;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})