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
const urlSeriesDetalle = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`

fetch(urlSeriesDetalle)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
    let id_g = data.genres.id
    let serie = `<article class="imagen-obra">
                    <img src="${image_url + data.poster_path}" alt="${data.name}">
                </article>
                <article class="info-obra">
                    <h2 class="titulo obra">${data.name}</h2>
                    <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                    <ul class="info-fila">
                        <li><strong>Calificación: ${data.vote_average} </strong></li>
                        <li><strong>Popularidad: ${data.popularity}</strong></li>
                        <li><strong>Temporadas:</strong> ${data.seasons.length} </li>
                        <li><strong>Fecha de estreno: ${data.first_air_date} </strong></li>
                        <li><strong>Género: <a href="detallegenero.html?id=${id_g}">${data.genres[0].name} </a></strong></li>
                    </ul>
                    <article class="descripcion">
                        <p>${data.overview}</p>  
                    </article>
                </article>`

    container.innerHTML += serie

    // Favoritos
    const boton = document.querySelector('.star')
    console.log(boton);
    window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos

    boton.addEventListener('click', function(){
        let storage = localStorage.getItem('favoritos')
        let storageJs = JSON.parse(storage); // Pasar de json a javascript
        storageJs.push(id); // Agregarlo al array
        
        console.log(storageJs);
        let storageJson = JSON.stringify(storageJs) // Pasarlo de nuevo a JSON
        localStorage.setItem('favoritos', storageJson) //Lo agregamos al storage en formato JSON
    })
})
.catch(function(error){
    console.log('El error fue: ', error);
})

// Series similares
let similares = document.querySelector(".peliculas")
let urlSimilares = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${api_key}&language=es-ES&page=1`

fetch(urlSimilares)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
         
    let results = data.results
            
    for(let i=0; i<5; i++){
        let id_p = results[i].id
        let info = `<article class="art-peli">
                        <a class="peli" href="detalleserie.html?id=${id_p}"><img src=${image_url + results[i].poster_path}>
                        <h3>${results[i].name}</h3>
                        </a>
                    </article>`
        similares.innerHTML += info;
    };
})
.catch(function(error){
    console.log('El error fue: ', error);
})