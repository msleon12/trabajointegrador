// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500" 

// traigo elementos del html
const buttonElement = document.querySelector ("#search"); //es el boton
const inputElement = document.querySelector ("#inputValue"); // es el input
const movieSearchable = document.querySelector ("#movies-searchable"); // es el div que va a contener otras cosas, pero es hijo del div "movies"

// Paso 4: creo una función para que escribir el paso 3 sea más simple y cómodo
function movieSection(movies){
    
    return movies.map((movie) => {
        if(movie.poster_path){ //Uso un condicional para que solo aparezcan los resultados que tienen imagenes
            return `
                <a href=detallepeli.html?id=${movie.id}><img
                src=${image_url + movie.poster_path} 
                data-movie-id=${movie.id}
                />
                <h2>${movie.title}</h2></a>`; //paso 6: hice dinámica las fotos al unir la image_url con el poster_path de cada busqueda
        }
    })
}

// paso 2: creo una función para poder poner los datos encontrados en un contenedor del html
function createMovieContainer(movies){
    const movieElement = document.createElement("div"); //creo un elemento div
    movieElement.setAttribute("class", "movie"); //le asigno la clase "movie"

    // Paso 3: construyo todo el html y hago dinámicas las imagenes usando la ruta "poster_path"
    const movieTemplate = `
        <h1> Tus resultados de busqueda </h1>
        <section class= "section">
            ${movieSection(movies)}
        </section>
    `;

    movieElement.innerHTML = movieTemplate; //uso inner.HTML para que se agregue toda la variable de arriba en el html
    return movieElement;
}

// Paso 5: Agrego la función que cree en el paso 2 para que se construya todo el html 
// Paso 6: pongo toda esta información es una función para escribir menos dentro del fecth
function renderSearchMovies (data){
    movieSearchable.innerHTML='' //Con esto me aseguro que cada vez que se escriba algo nuevo en el buscador se elimine lo de antes
    const movies = data.results;
    const movieBlock = createMovieContainer(movies); // esta es la función que cree en el paso 2
    movieSearchable.appendChild(movieBlock); //Con esto hice que el div "movie-searchable" sea hijo del div "movies"
    console.log('data: ', data);
}


// paso 1: Creo un evento para que funcione el buscador
buttonElement.addEventListener('click',function(event){
    event.preventDefault(); //para evitar que se recargue la página y se vayan los datos encontrados
    const value = inputElement.value; 

    const newUrl = urlBuscador + '&query=' + value //construyo una URL dinámica, que permita que aparezca cualquier valor que busco
    fetch(newUrl)
    .then(function(response){
        return response.json()
    })
    .then(renderSearchMovies) //esta es la función del paso 6
    .catch(function(error){
        console.log('el error fue: ', error);
    })
    inputElement.value = ''//elimino la palabra del buscador una vez que le dan click, para mejorar la UX
})

