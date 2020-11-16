// BUSCADOR
// Declaro otras variables
const buttonElement = document.querySelector ("#search");
const inputElement = document.querySelector ("#inputValue");
const movieSearchable = document.querySelector ("#movies-searchable");

// Genero URL para los videos de las peliculas del buscador
function generateUrl (path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=12058c71aa3652a9d53642bacf937088` 
    return url
} 

// Funcion para crear el iframe y que aparezca el trailer de youtube en la página
function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

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
    const path = '/search/movie'; //para que aparezcan los videos de las peliculas del buscador
    const newUrl = generateUrl(path) + '&query=' + value;
    
    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log("El error fue " + error);
        })
    
        inputElement.value ="";
    console.log("value: " + value);
}

// Event delegation.
document.onclick = function(event){
    const target = event.target;
    if (target.tagName.toLowerCase() === "img"){
        const movieId = target.dataset.movieId
        console.log("movie Id: ", movieId);
        const section = event.target.parentElement; //para seleccionar el elemento padre de la imagen. O sea el section
        const content = section.nextElementSibling; //para seleccionar el elemento "hermano" del section. O sea el div de clase "content"
        content.classList.add("content-display"); //le agrego una clase para cuando aparezca una imagen

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        // Buscar videos al hacer click en la imagen de la película
        fetch (url)
            .then((res) => res.json())
            .then ((data) => {
                console.log("videos: ", data);
                
                const videos = data.results;
                const length = videos.length > 4 ? 4 : videos.length; //condicional para establecer el máximo de trailers que pueden aparecer. Si es mayor que 4, que sea 4. Si es menor que 4 no hay problema
                const iframeContainer = document.createElement('div');

                for(let i = 0; i<videos.length; i++){
                    const videos = videos[i];
                    const iframe = createIframe(video);
                    iframeContainer.appendChild(iframe);
                    content.appendChild(iframeContainer);
                }
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    else if(target.id === "content-close"){
        const content = target.parentElement;
        content.classList.remove("content-display");
    }
}