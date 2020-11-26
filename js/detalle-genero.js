// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
console.log(id);
let media = queryObject.get('media')

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlGenerosPel = `https://api.themoviedb.org/3/genre/${id}?api_key=${api_key}&language=es-ES`
const urlGenerosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=es-ES`
const image_url = "https://image.tmdb.org/t/p/w500"
let container = document.querySelector('.tira')
const seriesTira = document.querySelector(".series-tira")
let titulo = document.querySelector(".title")

// Para que aparezca el titulo
if(media=="movie"){
    fetch(urlGenerosPel)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        let caja = `<h1>${data.name}</h1>`
        titulo.innerHTML += caja
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })
} else if(media=="tv"){
    fetch(urlGenerosSeries)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        for(let i = 0; i<20; i++){
            if(id == data.genres[i].id){
                titulo.innerText += data.genres[i].name;
            }
        }
    })
.catch(function(error){
    console.log('El error fue: ', error);
})
}

// Para que aparezcan las peliculas
let peliculas = document.querySelector(".peliculas")
let urlPeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=es-ES&with_genres=${id}`
let urlSeries =  `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=es-ES&with_genres=${id}&include_null_first_air_dates=false`

if(media=="movie"){
    fetch(urlPeliculas)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        let results = data.results
        console.log(results)

        if(results[0]){
            for(let i=0; i<30; i++){
                // if (id == results[i].genre_ids[0] || id == results[i].genre_ids[1]||id == results[i].genre_ids[2] || id == results[i].genre_ids[3] || id == results[i].genre_ids[4]){
                    let id_p = results[i].id
                    let tira = `<article class="art-peli">
                                    <a class="peli" href="detallepeli.html?id=${id_p}&media=${media}"><img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                    </a>
                                </article>`;
        
                    if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título"){
                        peliculas.innerHTML += tira;
                    }
                // } //IF
            }
        } else {
            peliculas.innerHTML = "<h3> Lo sentimos, no tenemos películas para mostrarte. </h3>"
        }        
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })
} else if(media == "tv"){
    fetch(urlSeries)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        let results = data.results
        console.log(results);
        for(let i=0 ; i<200 ; i++){
            // if(id == results[i].genre_ids[0] || id == results[i].genre_ids[1] || id == results[i].genre_ids[2]){
                let id_serie = data.results[i].id
                let articulo = `<article class="art-peli">
                                    <a class="peli" href='detalleserie.html?id=${id_serie}&media=${media}'>
                                        <img src= "${image_url + data.results[i].poster_path}" alt='${data.results[i].name}'>
                                        <h3> ${data.results[i].name}</h3> 
                                    </a>
                                </article>`
                if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título"){
                        peliculas.innerHTML += articulo;
                    }
                   
            // } IF
        }
    })
    .catch(function(error){
        console.log('El error fue:', error);
    })
}

// Flechas de scroll
let flechaIzquierda = document.querySelector(".flecha-izquierda")
let flechaDerecha = document.querySelector(".flecha-derecha")
let principal = document.querySelector(".peliculas")

flechaDerecha.addEventListener('click',function(){
    principal.scrollLeft += (principal.offsetWidth -300)
})

flechaIzquierda.addEventListener('click',function(){
    principal.scrollLeft -= (principal.offsetWidth -300)
})