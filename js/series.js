// Valores iniciales
const api_key  = "12058c71aa3652a9d53642bacf937088"
const image_url = "https://image.tmdb.org/t/p/w500"

// Populares
const urlSeriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=1` 
    fetch(urlSeriesPopulares)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.populares')
        let results = data.results

        for(let i=0; i<10; i++){
            let id_p = results[i].id
            let series = `<article class="art-peli-series">
                                <a class="peli" href="detalleserie.html?id=${id_p}"><img src=${image_url + results[i].poster_path} alt=${results[i].name}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].name != "Esta obra no ha de tener título"){
            container.innerHTML += series;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })

    // Top Rated
    const UrlSeriesTop =  `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=es-ES&page=1`
    fetch(UrlSeriesTop)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.top')
        let results = data.results

        for(let i=0; i<10; i++){
            let id_p = results[i].id
            let series = `<article class="art-peli-series">
                                <a class="peli" href="detalleserie.html?id=${id_p}"><img src=${image_url + results[i].poster_path} alt=${results[i].name}>
                                <h3>${results[i].name}</h3>
                                </a>
                            </article>`;
            if(results[i].poster_path && results[i].name != "Esta obra no ha de tener título"){
            container.innerHTML += series;
            }
        };
    })
    .catch(function(error){
        console.log('El error fue: ', error);
    })