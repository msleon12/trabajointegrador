let container = document.querySelector('.obra');

// Paso 1 : obtener la querystring
let queryString = location.search;

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
console.log(id);

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
const urlSeriesDetalle = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`

fetch(urlSeriesDetalle)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
    let serie = `<article class="imagen-obra">
                    <img src="${image_url + data.poster_path}" alt="${data.name}">
                </article>
                <article class="info-obra">
                    <h2 class="titulo obra">${data.name}</h2>
                    <ul class="info-fila">
                        <li><strong>Calificación: ${data.vote_average} </strong></li>
                        <li><strong>Popularidad: ${data.popularity}</strong></li>
                        <li><strong>Temporadas:</strong> ${data.seasons.length} </li>
                        <li><strong>Fecha de estreno: ${data.first_air_date} </strong></li>
                    </ul>
                    <article class="descripcion">
                        <p>${data.overview}</p>  
                    </article>
                    <ul class="info-columna">
                        <li><strong>Director:</strong></li>
                        <li><strong>Género: ${data.genres[0].name} </strong></li>
                        <li><strong>Actores:</strong></li>
                        
                    </ul>
                </article>
                    `

    container.innerHTML += serie
})
.catch(function(error){
    console.log('El error fue: ', error);
})

