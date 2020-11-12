// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const url = "https://api.themoviedb.org/3/search/movie?api_key=12058c71aa3652a9d53642bacf937088" 
const image_url = "https://image.tmdb.org/t/p/w500"


// Declaro otras variables
const buttonElement = document.querySelector ("#search");
const inputElement = document.querySelector ("#inputValue");
const movieSearchable = document.querySelector ("#movies-searchable");

// Función parte 1
function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path){
            return `<img 
                src=${image_url + movie.poster_path}
                data-movie-id=${movie.id}
                />`;
        }
    })
}

// Función parte 2
function createMovieContainer (movies){
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");
   
    const movieTemplate = `
    <section class= "section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">x</p>
    </div>
    `;
    movieElement.innerHTML = movieTemplate;
    return movieElement;

}

function renderSearchMovies(data){
    movieSearchable.innerHTML = "";
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log("data: ", data);
}
// Evento + Api para el buscador
buttonElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value
    
    const newUrl = url + '&query=' + value;
    
    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log("El error fue " + error);
        })
    
        inputElement.value ="";
    console.log("value: " + value);
}

// Event delegation. No se que es, pero esta bueno jajaja
document.onclick = function(event){
    const target = event.target;
    if (target.tagName.toLowerCase() === "img"){
        console.log('Hello');
    }
}