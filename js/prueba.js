console.log('hola');

let objeto = {
    tipo: "tv",
    id: "557"
}
localStorage.setItem('objeto', objeto) //Lo agrego al local storage en JSON

let objeto_stringify = JSON.stringify(objeto); //Lo paso a JS
console.log(objeto_stringify);

localStorage.setItem('objeto', objeto_stringify); //Lo agrego al local storage en JS

let objeto_destringify = JSON.parse(localStorage.getItem('objeto')); //lo vuelvo a pasar a JSON

window.localStorage.setItem('favoritos', '[]')