let container = document.querySelector('.obra')

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlDetalle = `https://api.themoviedb.org/3/movie/550?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

fetch(urlDetalle)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);

    let movie = `<article class="imagen-obra avengers"> 
                    <img src=${image_url + data.poster_path} alt=""></a>
                </article>
                <article class="info-obra">
                    <h2 class="titulo obra">${data.title}</h2>
                    <ul class="info-fila">
                        <li><strong>Calificación: ${data.vote_average} </li>
                        <li><strong>Duración: ${data.runtime} minutos </strong> </li>
                        <li><strong> Fecha de estreno: ${data.release_date}</strong></li>
                    </ul>
                <article class="descripcion">
                    <p> ${data.overview} </p>  
                </article>
                    <ul class="info-columna">
                        <li><strong> Director:</strong> </li>
                        <li><strong> Género: ${data.genres[0].name}</strong> </li>
                        <li><strong> Actores:</strong> </li>
                    </ul>
                </article>`
    
    container.innerHTML = movie;
})
.catch(function(error){
    console.log('El error fue: ', error);
})