let formulario = document.querySelector('form');
let campoBuscar = document.querySelector('.searchfield');
let mensaje = document.querySelector('.alert');

formulario.addEventListener('submit',function(event){
    event.preventDefault()
    if (campoBuscar.value == ""){
        mensaje.innerText += "el campo no debe estar vacío"
    }
    else{ this.submit();
    }
})

// Para que elimine la alerta si esta vacío el campoBuscar
campoBuscar.addEventListener('input', function(){
    mensaje.innerText = ""
})