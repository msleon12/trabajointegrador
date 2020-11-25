// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"

// Slider
let slider = document.querySelector(".slider-home")
let urlSlider = `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=es-ES&page=1`

fetch(urlSlider)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let results = data.results
        console.log(results[0].name);

        for(let i=0; i<5; i++){
            let id_p = results[i].id
            let info = `<article>
                            <a class="active" href="detalleserie.html?id=${id_p}&media=tv">
                                <img class="imagenes" src="${image_url + results[i].poster_path}" alt="${results[i].name}">
                            </a>
                        </article>`
            slider.innerHTML += info;
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })


// Populares
const urlSeriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=1` 
    fetch(urlSeriesPopulares)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.populares')
        let results = data.results

        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let series = `<article class="art-peli">
                                <a class="peli" href="detalleserie.html?id=${id_p}&media=tv"><img src=${image_url + results[i].poster_path} alt=${results[i].name}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].name != "Esta obra no ha de tener título."){
            container.innerHTML += series;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

    // Top Rated
    const UrlSeriesTop =  `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=es-ES&page=1`
    fetch(UrlSeriesTop)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.rated')
        let results = data.results

        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let series = `<article class="art-peli">
                                <a class="peli" href="detalleserie.html?id=${id_p}&media=tv"><img src=${image_url + results[i].poster_path} alt=${results[i].name}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].name != "Esta obra no ha de tener título"){
            container.innerHTML += series;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

// Flechas de scroll
let flechaIzquierda = document.querySelectorAll(".flecha-izquierda");
let flechaDerecha = document.querySelectorAll(".flecha-derecha")
let principal = document.querySelectorAll(".peliculas")

for(let i=0; i<flechaDerecha.length; i++){
    flechaDerecha[i].addEventListener('click', function(){
        principal[i].scrollLeft += (principal[i].offsetWidth -300)
    })
    flechaIzquierda[i].addEventListener('click', function(){
        principal[i].scrollLeft -= (principal[i].offsetWidth -300)
    })
}