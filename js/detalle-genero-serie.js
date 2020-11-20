
// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
console.log(id);

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
const urlGenerosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=es-ES`
const container = document.querySelector(".tira")
const titulo = document.querySelector(".title")
const seriesTira = document.querySelector(".series-tira")

// Para que aparezca el titulo
fetch(urlGenerosSeries)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data.genres)

    
    for(let i = 0; i<20; i++){
        if(id == data.genres[i].id){
            titulo.innerText += data.genres[i].name;
        }
    }
    
})
.catch(function(error){
    console.log('El error fue: ', error);
})

// Para que aparezcan series
const urlSeriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=1` 
fetch(urlSeriesPopulares)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data.results);
    for(let i=0 ; i<25 ; i++){
        if(id == data.results[i].genre_ids[0] || id == data.results[i].genre_ids[1] || id == data.results[i].genre_ids[2]){
            let id_serie = data.results[i].id
            let articulo = `<article class='tira-series'>
                                <a href='detalleserie.html?id=${id_serie}'>
                                    <img src= "${image_url + data.results[i].poster_path}" alt='${data.results[i].name}'>
                                    <h3> ${data.results[i].name}</h3> 
                                </a>
                            </article>`
            seriesTira.innerHTML += articulo
    
        }
    }
    if(seriesTira == ''){
        console.log('hola');
        // seriesTira.innerHTML += "<h2> Lo siento, no tenemos series para mostrarte </h2>"
    }

    console.log(seriesTira);
})
.catch(function(error){
    console.log('El error fue:', error);
})

