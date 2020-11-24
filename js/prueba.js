// const boton = document.querySelector('button')
// const storage = localStorage.getItem('favoritos')
// if(storage == null){
//     localStorage.setItem('favoritos', '[]')
// }
// // window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos
// let objeto = { //Creo un objeto para obtener también si es una serie o una pelicula, para poder distinguir en favoritos
//     tipo: "movie",
//     id: "123",
//     }
// // let objetoJSON = JSON.stringify(objeto)

// boton.addEventListener('click', function(){
//     let storage = localStorage.getItem('favoritos') //Para saber cual es el estado del storage
//     let storageJs = JSON.parse(storage); // Pasar de cadena de texto a javascript
  
//     if(!storageJs.includes(objeto)){
//         storageJs.push(objeto); // Agregarlo al array
//         boton.style.backgroundColor = "blue"; 
//         }
//     else{
//         storageJs = storageJs.filter(function(movie){
//             return movie != objetoJSON
//         })
//         boton.style.backgroundColor = "white"; 
//     } 
//     localStorage.setItem('favoritos', JSON.stringify(storageJs)) //Lo guardo pero en formato string 
// })

// Solo con ID
const boton = document.querySelector('button')
window.localStorage.setItem('favoritos', '[]') //creo un array que se llama favoritos
let id = "440"
boton.addEventListener('click', function(){
    let storage = localStorage.getItem('favoritos') //Para saber cual es el estado del storage
    let storageJs = JSON.parse(storage); // Pasar de cadena de texto a javascript
    if (!storageJs.includes(id)){
        storageJs.push(id)
        boton.style.backgroundColor = "blue"; 
    }
    else{
        storageJs = storageJs.filter(function(movie){
            return movie != id
        })
        boton.style.backgroundColor = "white"; 
    }
    localStorage.setItem('favoritos', JSON.stringify(storageJs))
})


// Con un objeto
// const boton = document.querySelector('.star')
// //creo un array que se llama favoritos
// let objeto = { //Creo un objeto para obtener también si es una serie o una pelicula, para poder distinguir en favoritos
//     tipo: media,
//     id: id,
// }

// let objetoJSON = JSON.stringify(objeto)

// boton.addEventListener('click', function(){
//         console.log('hola');
//         let storage = localStorage.getItem('favoritos') //Para saber cual es el estado del storage
//         let storageJs = JSON.parse(storage); // Pasar de cadena de texto a javascript

//     if(!storageJs.includes(objetoJSON)){ //Aca esta el problema, lo que tengo que subir al localstorage en el objeto, no el objeto en JSON. Pero la función includes solo funciona con JSON
//         storageJs.push(objetoJSON); // Agregarlo al array
    
//         boton.style.backgroundColor = "blue"; 
//     }
//     else{
//         storageJs = storageJs.filter(function(movie){
//             return movie != objetoJSON
//         })
//         boton.style.backgroundColor = "white"; 
//     } 
// localStorage.setItem('favoritos', JSON.stringify(storageJs)) //Lo guardo pero en formato string 
// })