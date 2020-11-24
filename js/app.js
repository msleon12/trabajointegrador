$(window).load(function() {
    // Desaparecer loader
    $(".load").fadeOut("slow");
})

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

// Slider
let slider = document.querySelector(".slider-home")
let urlSlider = `https://api.themoviedb.org/3/movie/550/recommendations?api_key=${api_key}&language=es-ES&page=1`

fetch(urlSlider)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let results = data.results
        console.log(results[0].title);

        for(let i=0; i<5; i++){
            let id_p = results[i].id
            let info = `<article>
                            <a class="active" href="detallepeli.html?id=${id_p}&media=movie">
                                <img class="imagenes" src="${image_url + results[i].poster_path}" alt="${results[i].title}">
                            </a>
                        </article>`
            slider.innerHTML += info;
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

// Tendencias (trending) diario y semanal
let diario = document.querySelector("#diario")
let semanal = document.querySelector("#semanal")
let trend = document.querySelector("#trend")
let container = document.querySelector('.tre')
console.log(trend.value)

const urlTrendDiario = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=es-ES` 
    fetch(urlTrendDiario)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            let results = data.results
            
            for(let i=0; i<20; i++){
                let id_p = results[i].id
                let trending = `<article class="art-peli">
                                    <a class="peli" href="detallepeli.html?id=${id_p}&media=movie"><img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                    </a>
                                </article>`;
                container.innerHTML += trending;
            };
        })
        .catch(function(error){
            console.log('El error fue: ', error);
        })

diario.addEventListener('click', function(){   
    
    container.innerHTML=''
    fetch(urlTrendDiario)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
            
        let results = data.results
            
        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let trending = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${id_p}&media=movie">
                                    <img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título" && results[i].genre_ids[0]){
                    container.innerHTML += trending;
            }
                
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })
})  

semanal.addEventListener('click', function(){
    const urlTrendSemanal = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=es-ES` 
    container.innerHTML=''
    fetch(urlTrendSemanal)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let results = data.results
        
        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let trending = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${id_p}&media=movie">
                                    <img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título" && results[i].genre_ids[0]){
                container.innerHTML += trending;
                }
            };
        })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

})
    
// Now playing (en cines) 
    const urlEstrenos = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=es-ES&page=1&region=AR` 
    fetch(urlEstrenos)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.peliculas.estrenos')
        let results = data.results
        
        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let estrenos = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${id_p}&media=movie">
                                    <img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                </a>
                            </article>`;

            if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título" && results[i].genre_ids[0]){
                container.innerHTML += estrenos;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

// Top rated (ranking)
    const urlRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=es-ES&page=1&region=AR` 
    fetch(urlRated)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.peliculas.ranking')
        let results = data.results

        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let ranking = `<article class="art-peli">
                                <a class="peli" href="detallepeli.html?id=${id_p}&media=movie"><img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                <h3>${results[i].title}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].title != "Esta obra no ha de tener título" && results[i].genre_ids[0]){
                container.innerHTML += ranking;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

// Series populares
    const urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=1` 
    fetch(urlSeries)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.peliculas.series')
        let results = data.results

        for(let i=0; i<20; i++){
            let id_p = results[i].id
            let series = `<article class="art-peli">
                                <a class="peli" href="detalleserie.html?id=${id_p}&media=tv"><img src=${image_url + results[i].poster_path} alt=${results[i].name}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].name != "Esta obra no ha de tener título" && results[i].genre_ids[0]){
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
console.log(flechaDerecha);
let principal = document.querySelectorAll(".peliculas")
//let indicadores = document.querySelector(".indicadores")

for(let i=0; i<flechaDerecha.length; i++){
    
    flechaDerecha[i].addEventListener('click', function(){
        principal[i].scrollLeft += (principal[i].offsetWidth -300)
    })
    flechaIzquierda[i].addEventListener('click', function(){
        principal[i].scrollLeft += (principal[i].offsetWidth -300)
    })
}

    // flechaDerecha.addEventListener('click',function(){
    //     for(let i = 0; i<5; i++){
    //         principal.scrollLeft += (principal.offsetWidth -300)
    //     }
        
    // })

    // flechaIzquierda.addEventListener('click',function(){
    //     principal.scrollLeft -= (principal.offsetWidth -300)
    // })



// Paginación
/* for(i=0; i<3; i++){
    const indicador = document.createElement('button')

    if(i===0){
        indicador.classList.add('activo')
    }

    indicadores.appendChild(indicador)
    indicador.addEventListener('click', function(e){
        principal.scrollLeft = i * principal.offsetWidth

        document.querySelector(".indicadores.activo").classList.remove("activo")
        e.target.classList.add('activo')
    })
} */