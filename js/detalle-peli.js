let container = document.querySelector('.obra')

// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlDetalle = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES` 
const image_url = "https://image.tmdb.org/t/p/w500"

fetch(urlDetalle)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);

    let movie = `<article class="imagen-obra avengers"> 
                    <img src=${image_url + data.poster_path} alt="${data.title}">
                </article>
                <article class="info-obra">
                    <h2 class="titulo obra">${data.title}</h2>
                    <ul class="info-fila">
                        <li><strong>Calificación del público: ${data.vote_average} </li>
                        <li><strong>Duración: ${data.runtime} minutos </strong> </li>
                        <li><strong>Fecha de estreno: ${data.release_date}</strong></li>
                        <li><strong>Género: ${data.genres[0].name}</strong> </li>
                    </ul>
                    <article class="descripcion">
                        <p> ${data.overview} </p>  
                    </article>
                </article>`
    
    container.innerHTML += movie;
})
.catch(function(error){
    console.log('El error fue: ', error);
})

// Reviews
const urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
let reviews = document.querySelector(".reviews")

fetch(urlReviews)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
    let results = data.results

    for(let i=0; i<5; i++){
        let comentarios = `<article class="comentarios">
                            <h3>${results[i].author}</h3>
                            <p>${results[i].content}</p>
                        </article>`;
        reviews.innerHTML += comentarios;
    }
})
.catch(function(error){
    console.log('El error fue: ', error);
})