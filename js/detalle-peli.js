// Paso 1 : obtener la querystring
let queryString = location.search;
console.log(queryString);

// Paso 2: transformarla en un objeto literal
let queryObject = new URLSearchParams(queryString);

// Paso 3: obtener el dato para completar el endpoint
let id = queryObject.get('id');
let media = queryObject.get('media')

// Valores iniciales
let container = document.querySelector('.obra')
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlDetalle = `https://api.themoviedb.org/3/${media}/${id}?api_key=${api_key}&language=es-ES` 
const image_url = "https://image.tmdb.org/t/p/w500"

const storage = localStorage.getItem('favoritos') 
if (storage === null){ //Condicional por si todavía no fue creado el storage
    localStorage.setItem('favoritos','[]') 
}
if(media == "movie"){
        // Pelicula principal
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
                        <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                        <ul class="info-fila">
                            <li><strong>Calificación: ${data.vote_average}</strong></li>
                            <li><strong>Duración: ${data.runtime} minutos </strong> </li>
                            <li><strong>Fecha de estreno: ${data.release_date}</strong></li>
                            <li><strong>Género: ${data.genres[0].name}</strong> </li> 
                        </ul>
                        <article class="descripcion">
                            <p> ${data.overview} </p>  
                        </article>
                    </article>`
        
        container.innerHTML += movie;

         // Favoritos
        const boton = document.querySelector('.star')
        console.log(boton);
        window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos
        
        boton.addEventListener('click', function(){
            let storage = localStorage.getItem('favoritos') //Para saber cual es el estado del storage
            let storageJs = JSON.parse(storage); // Pasar de cadena de texto a javascript
            let objeto = { //Creo un objeto para obtener también si es una serie o una pelicula, para poder distinguir en favoritos
                tipo: media,
                id: id,
                }
            if(!storageJs.includes(objeto)){
                storageJs.push(objeto); // Agregarlo al array
                boton.style.backgroundColor = "blue"; 
                
            }
            else {
                storageJs = storageJs.filter(function(movie){
                    return movie != objeto
                })
                boton.style.backgroundColor = "white"
            }
            let storageJson = JSON.stringify(storageJs) // Pasarlo de nuevo a JSON
            localStorage.setItem('favoritos', storageJson) //Lo agregamos al storage en formato JSON
            
        })

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

        if (results[0]){
            for(let i=0; i<5; i++){
                let comentarios = `<article class="comentarios">
                                    <h3><i class="fas fa-user"></i>${results[i].author}</h3>
                                    <p>${results[i].content}</p>
                                    
                                </article>`;
                reviews.innerHTML += comentarios;
            }
        }
        else{
            reviews.innerHTML += "<h3> Lo sentimos, no tenemos opiniones para mostrarte </h3>"
        }
        
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

    // Películas similares
    let similares = document.querySelector(".peliculas")
    let urlSimilares = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=es-ES&page=1`

    fetch(urlSimilares)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
            
        let results = data.results
        
        if(results[0]){
            for(let i=0; i<10; i++){
                let id_p = results[i].id
                let info = `<article class="art-peli detalle">
                                <a class="peli" href="detallepeli.html?id=${id_p}&media=${media}">
                                    <img src=${image_url + results[i].poster_path} alt=${results[i].title}>
                                    <h3>${results[i].title}</h3>
                                </a>
                            </article>`
                similares.innerHTML += info;
            };
        }
        else{
            similares.innerHTML += "<h3> Lo sentimos, no tenemos peliculas relacionadas para compartirte </h3>"
        }
        
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

}
else if(media == "tv"){
    // Serie principal
    fetch(urlDetalle)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
 
        let movie = `<article class="imagen-obra avengers"> 
                        <img src=${image_url + data.poster_path} alt="${data.name}">
                     </article>
                     <article class="info-obra">
                         <h2 class="titulo obra">${data.name}</h2> 
                         <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                         <ul class="info-fila">
                             <li><strong>Calificación: ${data.vote_average}</strong></li>
                             <li><strong>Temporadas: ${data.number_of_seasons}</strong> </li>
                             <li><strong>Fecha de estreno: ${data.first_air_date}</strong></li>
                             <li><strong>Género: ${data.genres[0].name}</strong> </li>
                         </ul>
                         <article class="descripcion">
                             <p> ${data.overview} </p>  
                         </article>
                     </article>`
         
        container.innerHTML += movie;  
        // Favoritos
        // const boton = document.querySelector('.star')
        // console.log(boton);
        // window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos
        // let objeto = { //Creo un objeto para obtener también si es una serie o una pelicula, para poder distinguir en favoritos
        // tipo: media,
        // id: id,
        // }
 
        // boton.addEventListener('click', function(){
        //     let storage = localStorage.getItem('favoritos')
        //     let storageJs = JSON.parse(storage); // Pasar de json a javascript
             
        //     if(!storageJs.includes(objeto)){
                 
        //         storageJs.push(objeto); // Agregarlo al array
        //         boton.style.backgroundColor = "blue";
        //         let storageJson = JSON.stringify(storageJs) // Pasarlo de nuevo a JSON
        //         localStorage.setItem('favoritos', storageJson) //Lo agregamos al storage en formato JSON
        //     }
        //     else { //Sacar de favoritos 
        //         storageJs = storageJs.filter(function(movie){
        //             return movie != objeto
        //         })
        //         boton.style.backgroundColor = "white"
        //      }
            
        //      console.log(storageJs);
             
        //  })
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
        
        if(results[0]){
            for(let i=0; i<10; i++){
                let id_p = results[i].id
                let info = `<article class="art-peli detalle">
                                <a class="peli" href="detalleserie.html?id=${id_p}&media=${media}"><img src=${image_url + results[i].poster_path}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`
                similares.innerHTML += info;
            };
        }
        else{
            similares.innerHTML += "<h3> Lo siento, no tenemos series relacionadas para compartirte </h3>"
        }
        
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })
    
}


