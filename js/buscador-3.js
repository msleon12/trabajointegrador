  //obtengo el query string
  let queryString = window.location.search

  //paso de ese texto a un objeto
  let objetoQuery = new URLSearchParams(queryString);

  //ahora si obtengo el resultado de la busqueda
  var resultado = objetoQuery.get('titulo');

  const api_key  = "12058c71aa3652a9d53642bacf937088"
  const urlBuscador = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}` 
  const image_url = "https://image.tmdb.org/t/p/w500" 


  const newUrl = urlBuscador + '&query=' + resultado //construyo una URL dinámica, que permita que aparezca cualquier valor que busco
    fetch(newUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)


        let contenedor =document.querySelector("#movies-searchable")
let movies= data.results 
 for (const movie of movies) {
    contenedor.innerHTML+=`
    <h1> Tus resultados de busqueda </h1>
    <section class= "section">
    <a href=detallepeli.html?id=${movie.id}><img
    src=${image_url + movie.poster_path} 
    data-movie-id=${movie.id}
    />
    <h2>${movie.title}</h2></a>;
    </section>
`;
 }
});
           
     
//esta es la función del paso 6