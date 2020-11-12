// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const url = "https://api.themoviedb.org/3/search/movie?api_key=12058c71aa3652a9d53642bacf937088" 
const image_url = "https://image.tmdb.org/t/p/w500"



const buttonElement = document.querySelector ("#search");
const inputElement = document.querySelector ("#inputValue");
const movieSearchable = document.querySelector ("#movies-searchable");

function movieSection(movies){
    return movies.map((movie) => {
        return `
        <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>`;

    })
}
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
buttonElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value
    
    const newUrl = url + '&query=' + value
    
    fetch(newUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log("data: ", data);
            const movies = data.results;
            const movieBlock = createMovieContainer(movies);
            movieSearchable.appendChild(movieBlock); 
        })
        .catch(function(error){
            console.log("El error fue " + error);
        })
    console.log("value: " + value);
}
