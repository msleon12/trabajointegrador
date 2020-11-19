let formulario = document.querySelector('form');
let campoBuscar = document.querySelector('.searchfield');
let mensaje = document.querySelector('.alert');

formulario.addEventListener('submit',function(event){
    event.preventDefault()
    if (campoBuscar.value == ""){
        mensaje.innerText = "el campo no debe estar vacío"
    }
    else{ this.submit();
    }
})

// Para que elimine el mensaje de estar vacío el buscador si se para en el buscador
campoBuscar.addEventListener('focus', function(){
    mensaje.innerText = ""
})