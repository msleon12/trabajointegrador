
// Valores iniciales
const obra = window.localStorage.getItem('favoritos')
console.log(obra)
let storage = localStorage.getItem('favoritos')
console.log(storage);
let storageJs = JSON.parse(storage); // Lo paso a JS
console.log(storageJs);

const contenedor1 = document.querySelector('.favoritos-tira-peli')
const contenedor2 = document.querySelector('.favoritos-tira-series')
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
let movie = ''

for(let i=0; i<30; i++){
    if(storageJs[i].tipo == "movie"){
        console.log(storageJs[i].id);
        fetch(`https://api.themoviedb.org/3/movie/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            movie += `<article class = "favoritos">
                            <a href="detallepeli.html?id=${data.id}&media=movie">
                                <h2> ${data.title}</h2>
                                <img src="${image_url + data.poster_path}" alt="${data.title}">
                            </a>
                            <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                        </article>`
            contenedor1.innerHTML += movie;
            console.log(movie);
        })
        .catch(function(error){
            console.log('El error fue: ', error);
        })
    }
    else if (storageJs[i].tipo == "tv"){
        fetch(`https://api.themoviedb.org/3/tv/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            movie += `<article class = "favoritos">
                            <a href="detallepeli.html?id=${data.id}&media=movie">
                                <h2> ${data.name}</h2>
                                <img src="${image_url + data.poster_path}" alt="${data.name}">
                            </a>
                            <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                        </article>`
            contenedor1.innerHTML += movie;
            console.log(movie);
        })
        .catch(function(error){
            console.log('El error fue: ', error);
        })
    }
}

 // Para que puedan sacar de favoritos
const boton = document.querySelector('.star')
boton.style.backgroundColor = "white"
console.log(boton);
window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos
let objeto = { //Creo un objeto para obtener también si es una serie o una pelicula, para poder distinguir en favoritos
    tipo: media,
    id: id,
}

boton.addEventListener('click', function(){
    let storage = localStorage.getItem('favoritos')
    let storageJs = JSON.parse(storage); // Pasar de json a javascript
      
    if(!storageJs.includes(objeto)){
          
        storageJs.push(objeto); // Agregarlo al array
        boton.style.backgroundColor = "blue";
        let storageJson = JSON.stringify(storageJs) // Pasarlo de nuevo a JSON
        localStorage.setItem('favoritos', storageJson) //Lo agregamos al storage en formato JSON
    }
    else {
        storageJs = storageJs.filter(function(movie){
            return movie != objeto
        })
        boton.style.backgroundColor = "white"
      }
     
      console.log(storageJs);
      
  })


