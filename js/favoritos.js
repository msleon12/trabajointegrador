
// Valores iniciales

let storage = localStorage.getItem('favoritos')
console.log(storage);
let storageJs = JSON.parse(storage); // Lo paso a JS
console.log(storageJs);

// Para favoritos
window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos

const contenedor1 = document.querySelector('.favoritos-tira-peli')
const contenedor2 = document.querySelector('.favoritos-tira-series')
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
let movie = ''

for(let i=0; i<40; i++){
    let objeto = { 
        tipo: storageJs[i].tipo,
        id: storageJs[i].id,
    }
    if(storageJs[i].tipo == "movie"){
        console.log(storageJs[i].id);
        fetch(`https://api.themoviedb.org/3/movie/${storageJs[i].id}?api_key=${api_key}&language=es-ES`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            movie += `<article class="favoritos">
                            <a href="detallepeli.html?id=${data.id}&media=movie">
                                <h2> ${data.title}</h2>
                                <img src="${image_url + data.poster_path}" alt="${data.title}">
                            </a>
                            <button class= "star" type="submit" id="star-boton"><i class="fas fa-star "></i></button>
                        </article>`
            contenedor1.innerHTML += movie;

             // Para que puedan sacar de favoritos
            const boton = document.querySelector('.star')
            boton.style.backgroundColor = "blue"

            boton.addEventListener('click', function(){
                let storage = localStorage.getItem('favoritos')
                let storageJs = JSON.parse(storage); // Pasar de json a javascript
                if(!storageJs.includes(objeto)){
                    console.log('hola');
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
            })
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

             // Para que puedan sacar de favoritos
            const boton = document.querySelector('.star')
            boton.style.backgroundColor = "blue"

            boton.addEventListener('click', function(){
                let storage = localStorage.getItem('favoritos')
                let storageJs = JSON.parse(storage); // Pasar de json a javascript
                if(!storageJs.includes(objeto)){
                    console.log('hola');
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
            })
            
        })
        .catch(function(error){
            console.log('El error fue: ', error);
        })
    }
}





