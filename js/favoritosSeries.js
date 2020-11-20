// Valores iniciales
const idFavorito = window.localStorage.getItem('favoritos')
let storage = localStorage.getItem('favoritos')
console.log(storage);
let storageJs = JSON.parse(storage); // Lo paso a JS
const contenedor = document.querySelector('.favoritos-tira')
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
let movie = ''

storageJs.forEach(id => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        movie += `<article class = "favoritos">
                        <a href="detallepeli.html?id=${idFavorito}">
                            <h2> ${data.name}</h2>
                            <img src="${image_url + data.poster_path}" alt="${data.name}">
                        </a>
                    </article>`
        contenedor.innerHTML += movie;
        console.log(movie);
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })
});