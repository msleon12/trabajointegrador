// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let list = queryObject.get('list');

// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const url = `https://api.themoviedb.org/3/list/${list}?api_key=${api_key}&language=es-ES` 
const image_url = "https://image.tmdb.org/t/p/w500"
const container = document.querySelector('.container')
console.log(container)

if(list == 1){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for (let i = 0; i<data.items.length; i++){
            let results = data.items[i]
            console.log(results)
            let id_p = results.id;
            console.log(id_p);
            let tira = `<article class="art-peli">
                                    <a class="peli" href="detallepeli.html?id=${id_p}&media=movie"><img src=${image_url + results.poster_path} alt=${results.title}>
                                    <h3>${results.title}</h3>
                                    </a>
                    </article>`;
            
            container.innerHTML += tira
        
        }   
        
    })
    .catch(function(data){
        console.log("el error fue:", error)
    })
}
else if (list == 3){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for (let i = 0; i<data.items.length; i++){
            let results = data.items[i]
            console.log(results)
            let id_p = results.id;
            console.log(id_p);
            let tira = `<article class="art-peli">
                                    <a class="peli" href="detallepeli.html?id=${id_p}&media=movie"><img src=${image_url + results.poster_path} alt=${results.title}>
                                    <h3>${results.title}</h3>
                                    </a>
                    </article>`;
            
            container.innerHTML += tira
        
        }   
        
    })
    .catch(function(data){
        console.log("el error fue:", error)
    })
}

// Flechas de scroll
let flechaIzquierda = document.querySelectorAll(".flecha-izquierda");
let flechaDerecha = document.querySelectorAll(".flecha-derecha")
console.log(flechaDerecha);
let principal = document.querySelectorAll(".peliculas")

for(let i=0; i<flechaDerecha.length; i++){
    flechaDerecha[i].addEventListener('click', function(){
        principal[i].scrollLeft += (principal[i].offsetWidth -300)
    })
    flechaIzquierda[i].addEventListener('click', function(){
        principal[i].scrollLeft -= (principal[i].offsetWidth -300)
    })
}