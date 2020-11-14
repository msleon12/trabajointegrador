// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
const image_url = "https://image.tmdb.org/t/p/w500"

// traigo elementos del html
const buttonElement = document.querySelector ("#search");
const inputElement = document.querySelector ("#inputValue");

buttonElement.addEventListener('click',function(event){
    event.preventDefault();
    const value = inputElement.value; 

    const newUrl = urlBuscador + '&query=' + value //construyo una URL dinámica, que permita que aparezca cualquier valor que busco
    fetch(newUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        
        console.log('data: ', data);
    })
    .catch(function(error){
        console.log('el error fue: ', error);
    })
})

