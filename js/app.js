let url = "https://api.themoviedb.org/3/movie/552?api_key=12058c71aa3652a9d53642bacf937088"
fetch(url)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
})
.catch(function(error){
    console.log("El error fue " + error);
})