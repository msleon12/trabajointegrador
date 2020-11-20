// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"
let urlGenerosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=es-ES`
let genresSeries = document.querySelector(".tv")
console.log(genresSeries);

fetch(urlGenerosSeries)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    let generosTV = data.genres

    for(let i=0; i<generosTV.length; i++){
    genresSeries.innerHTML += `<li><a href="./detallegeneroserie.html?id=${generosTV[i].id}">${generosTV[i].name}</a></li>`;
    }
})
.catch(function(error) {
    console.log("Error: " + error);
})